import { SlashCommandBuilder } from 'discord.js';
import { getPlayer } from '../music/player.js';

export default {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resume paused music'),

    async execute(interaction) {
        const player = getPlayer(interaction.guildId);
        if (!player) return interaction.reply({ content: 'Nothing is playing.', ephemeral: true });

        player.unpause();
        await interaction.reply('▶️ Resumed the music.');
    }
};
