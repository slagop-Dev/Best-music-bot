import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('playlist')
        .setDescription('Play a full YouTube playlist')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('YouTube playlist URL')
                .setRequired(true)
        ),

    async execute(interaction) {
        // This is mostly handled by /play if you pass playlist URL
        await interaction.reply('Use `/play <playlist URL>` to play playlists.');
    }
};
