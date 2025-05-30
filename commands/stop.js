import { SlashCommandBuilder } from 'discord.js';
import { clearQueue } from '../music/queue.js';
import { getPlayer } from '../music/player.js';

export default {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the music and clear the queue'),

    async execute(interaction) {
        const player = getPlayer(interaction.guildId);
        if (player) player.stop();

        await clearQueue(interaction.guildId);

        await interaction.reply('⏹️ Stopped the music and cleared the queue.');
    }
};
