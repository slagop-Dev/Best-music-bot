import { SlashCommandBuilder } from 'discord.js';
import { getQueue, setQueue } from '../music/queue.js';
import { getPlayer } from '../music/player.js';

export default {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the current song'),

    async execute(interaction) {
        const queue = await getQueue(interaction.guildId);
        if (!queue || !queue.songs.length) return interaction.reply({ content: 'Queue is empty.', ephemeral: true });

        queue.songs.shift(); // Remove current song

        if (!queue.songs.length) {
            // No more songs, stop player
            const player = getPlayer(interaction.guildId);
            if (player) player.stop();
            await setQueue(interaction.guildId, { ...queue, songs: [] });
            return interaction.reply('⏭️ Skipped song. No more songs in queue.');
        }

        await setQueue(interaction.guildId, queue);

        // Play next song
        const player = getPlayer(interaction.guildId);
        if (player) player.stop(); // Trigger next song play externally or handle here

        await interaction.reply(`⏭️ Skipped to next song: **${queue.songs[0].title}**`);
    }
};
