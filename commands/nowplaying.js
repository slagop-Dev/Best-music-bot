import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { getQueue } from '../music/queue.js';

export default {
    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('Show current playing song'),

    async execute(interaction) {
        const queue = await getQueue(interaction.guildId);
        if (!queue || !queue.songs.length) return interaction.reply({ content: 'Nothing is playing.', ephemeral: true });

        const song = queue.songs[0];

        const embed = new EmbedBuilder()
            .setTitle('🎵 Now Playing')
            .setDescription(`[${song.title}](${song.url})`)
            .setThumbnail(song.thumbnail)
            .addFields(
                { name: 'Requested By', value: song.requestedBy, inline: true },
                { name: 'Duration', value: song.duration, inline: true }
            )
            .setColor('Green');

        await interaction.reply({ embeds: [embed] });
    }
};
