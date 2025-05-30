import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import lyricsFinder from 'lyrics-finder';

export default {
    data: new SlashCommandBuilder()
        .setName('lyrics')
        .setDescription('Get lyrics for a song')
        .addStringOption(option => option
            .setName('song')
            .setDescription('Name of the song to find lyrics for')
            .setRequired(false)
        ),

    async execute(interaction) {
        let query = interaction.options.getString('song');

        if (!query) {
            return interaction.reply({ content: 'Please specify the song name or use /nowplaying.', ephemeral: true });
        }

        await interaction.deferReply();

        try {
            const lyrics = await lyricsFinder(query, '');
            if (!lyrics) {
                return interaction.editReply(`No lyrics found for **${query}**.`);
            }

            const embed = new EmbedBuilder()
                .setTitle(`Lyrics for: ${query}`)
                .setDescription(lyrics.length > 4096 ? lyrics.substring(0, 4093) + '...' : lyrics)
                .setColor('Blue');

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            await interaction.editReply('Error fetching lyrics.');
        }
    }
};
