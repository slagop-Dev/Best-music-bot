import { SlashCommandBuilder } from 'discord.js';
import { getQueue, setQueue } from '../music/queue.js';
import { getPlayer } from '../music/player.js';

export default {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Set the playback volume (0.1 - 2.0)')
        .addNumberOption(option =>
            option.setName('level')
                .setDescription('Volume level')
                .setRequired(true)
                .setMinValue(0.1)
                .setMaxValue(2.0)
        ),

    async execute(interaction) {
        const volume = interaction.options.getNumber('level');
        const queue = await getQueue(interaction.guildId);
        if (!queue) return interaction.reply({ content: 'Nothing is playing.', ephemeral: true });

        queue.volume = volume;
        await setQueue(interaction.guildId, queue);

        const player = getPlayer(interaction.guildId);
        if (player && player.state.resource) {
            player.state.resource.volume.setVolume(volume);
        }

        await interaction.reply(`🔊 Volume set to ${volume * 100}%`);
    }
};
