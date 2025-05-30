import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('panel')
        .setDescription('Show music control panel'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('🎶 Music Control Panel')
            .setDescription('Use the buttons below to control the music.')
            .setColor('DarkBlue');

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('pause')
                    .setLabel('Pause')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('resume')
                    .setLabel('Resume')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('skip')
                    .setLabel('Skip')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('stop')
                    .setLabel('Stop')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('shuffle')
                    .setLabel('Shuffle')
                    .setStyle(ButtonStyle.Primary),
            );

        const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('loop')
                    .setLabel('Loop')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('volume_up')
                    .setLabel('Vol +')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('volume_down')
                    .setLabel('Vol -')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('lyrics')
                    .setLabel('Lyrics')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('nowplaying')
                    .setLabel('Now Playing')
                    .setStyle(ButtonStyle.Secondary),
            );

        await interaction.reply({ embeds: [embed], components: [row, row2] });
    }
};
