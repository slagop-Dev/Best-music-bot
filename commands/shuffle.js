import { SlashCommandBuilder } from 'discord.js';
import { getQueue, setQueue } from '../music/queue.js';

export default {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffle the queue'),

    async execute(interaction) {
        const queue = await getQueue(interaction.guildId);
        if (!queue || queue.songs.length < 2) return interaction.reply({ content: 'Not enough songs in the queue to shuffle.', ephemeral: true });

        for (let i = queue.songs.length - 1; i > 1; i--) {
            const j = Math.floor(Math.random() * (i - 1)) + 1; // don't shuffle currently playing song at 0
            [queue.songs[i], queue.songs[j]] = [queue.songs[j], queue.songs[i]];
        }

        await setQueue(interaction.guildId, queue);
        await interaction.reply('🔀 Queue shuffled.');
    }
};
