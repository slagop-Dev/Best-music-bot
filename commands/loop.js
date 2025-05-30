import { SlashCommandBuilder } from 'discord.js';
import { getQueue, setQueue } from '../music/queue.js';

export default {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Set loop mode')
        .addStringOption(option =>
            option.setName('mode')
                .setDescription('Loop mode: off, song, queue')
                .setRequired(true)
                .addChoices(
                    { name: 'Off', value: 'off' },
                    { name: 'Song', value: 'song' },
                    { name: 'Queue', value: 'queue' }
                )
        ),

    async execute(interaction) {
        const mode = interaction.options.getString('mode');
        const queue = await getQueue(interaction.guildId);
        if (!queue) return interaction.reply({ content: 'Nothing is playing.', ephemeral: true });

        queue.loopMode = mode;
        await setQueue(interaction.guildId, queue);

        await interaction.reply(`🔁 Loop mode set to **${mode}**.`);
    }
};
