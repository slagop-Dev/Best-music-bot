import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import ytdl from 'ytdl-core';
import ytpl from 'ytpl';
import { getQueue, setQueue } from '../music/queue.js';
import { playSong, getPlayer } from '../music/player.js';

export default {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song or playlist from YouTube')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('YouTube URL or search term')
                .setRequired(true)
        ),

    async execute(interaction) {
        const query = interaction.options.getString('query');
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply({ content: 'You need to be in a voice channel!', ephemeral: true });
        }

        await interaction.deferReply();

        // Check if query is playlist
        let songs = [];
        if (ytpl.validateID(query)) {
            const playlist = await ytpl(query);
            songs = playlist.items.map(item => ({
                title: item.title,
                url: item.url,
                duration: item.duration,
                thumbnail: item.bestThumbnail.url,
                requestedBy: interaction.user.username
            }));
        } else {
            // Single video
            let videoInfo;
            if (ytdl.validateURL(query)) {
                videoInfo = await ytdl.getInfo(query);
            } else {
                // Search using ytsr or another library (omitted for brevity)
                return interaction.editReply('Only direct YouTube URLs or playlists are supported for now.');
            }

            songs.push({
                title: videoInfo.videoDetails.title,
                url: videoInfo.videoDetails.video_url,
                duration: new Date(videoInfo.videoDetails.lengthSeconds * 1000).toISOString().substr(11, 8),
                thumbnail: videoInfo.videoDetails.thumbnails[0].url,
                requestedBy: interaction.user.username
            });
        }

        // Fetch or create queue
        const queue = await getQueue(interaction.guildId);

        queue.songs.push(...songs);
        await setQueue(interaction.guildId, queue);

        // Play if not already playing
        let player = getPlayer(interaction.guildId);
        if (!player || player.state.status === 'idle') {
            const firstSong = queue.songs[0];
            await playSong(interaction.guild, voiceChannel, firstSong, queue.volume);
            interaction.editReply(`🎶 Started playing: **${firstSong.title}**`);
        } else {
            interaction.editReply(`🎶 Added ${songs.length} song(s) to the queue.`);
        }
    }
};
