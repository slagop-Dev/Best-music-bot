import { SlashCommandBuilder } from 'discord.js';
import { getPlayer } from '../music/player.js';

export default {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the currently playing song'),

    async execute(interaction) {
        const player = getPlayer(interaction.guildId);
        if (!player) return interaction.reply({ content: 'Nothing is playing.', ephemeral: true });

        player.pause();
        await interaction.reply('⏸️ Paused the music.');
    }
};
