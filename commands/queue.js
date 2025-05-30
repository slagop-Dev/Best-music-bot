import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { getQueue } from '../music/queue.js';

export default {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('View the music queue'),

    async execute(interaction) {
        const queue = await getQueue(interaction.guildId);
        if (!queue || !queue.songs.length) return interaction.reply({ content: 'The queue is empty.', ephemeral: true });

        const embed = new EmbedBuilder()
            .setTitle('🎶 Current Queue')
            .setColor('Blurple');

        const description = queue.songs.map((song, i) => `${i + 1}. [${song.title}](${song.url}) - Requested by: ${song.requestedBy}`).join('\n');

        embed.setDescription(description);

        await interaction.reply({ embeds: [embed] });
    }
};
