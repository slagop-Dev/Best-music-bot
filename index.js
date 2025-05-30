// index.js
import { Client, GatewayIntentBits, Collection } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages
    ]
});

client.commands = new Collection();

// Load slash commands here if needed
// Example: client.commands.set('play', require('./commands/play.js'));

// ✅ PASTE BUTTON HANDLER BELOW THIS LINE
client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(interaction);
        } catch (err) {
            console.error(err);
            await interaction.reply({ content: 'There was an error.', ephemeral: true });
        }
    }

    // 🔘 PASTE YOUR BUTTON INTERACTION HANDLER HERE
    if (interaction.isButton()) {
        const id = interaction.customId;
        const guildId = interaction.guildId;

        const { getQueue, setQueue } = require('./music/queue.js');
        const { getPlayer } = require('./music/player.js');

        switch (id) {
            case 'pause': {
                const player = getPlayer(guildId);
                if (!player) return interaction.reply({ content: 'Nothing is playing.', ephemeral: true });
                player.pause();
                return interaction.reply({ content: '⏸️ Paused the music.', ephemeral: true });
            }
            case 'resume': {
                const player = getPlayer(guildId);
                if (!player) return interaction.reply({ content: 'Nothing is playing.', ephemeral: true });
                player.unpause();
                return interaction.reply({ content: '▶️ Resumed the music.', ephemeral: true });
            }
            case 'skip': {
                // Your skip logic
                return interaction.reply({ content: '⏭️ Skipped current song.', ephemeral: true });
            }
            case 'stop': {
                const player = getPlayer(guildId);
                if (player) player.stop();
                await clearQueue(guildId);
                return interaction.reply({ content: '⏹️ Stopped the music and cleared the queue.', ephemeral: true });
            }
            case 'shuffle': {
                const queue = await getQueue(guildId);
                if (!queue || queue.songs.length < 2) return interaction.reply({ content: 'Not enough songs to shuffle.', ephemeral: true });

                for (let i = queue.songs.length - 1; i > 1; i--) {
                    const j = Math.floor(Math.random() * (i - 1)) + 1;
                    [queue.songs[i], queue.songs[j]] = [queue.songs[j], queue.songs[i]];
                }
                await setQueue(guildId, queue);
                return interaction.reply({ content: '🔀 Queue shuffled.', ephemeral: true });
            }
            case 'loop': {
                const queue = await getQueue(guildId);
                if (!queue) return interaction.reply({ content: 'Nothing is playing.', ephemeral: true });

                let newMode;
                if (queue.loopMode === 'off') newMode = 'song';
                else if (queue.loopMode === 'song') newMode = 'queue';
                else newMode = 'off';

                queue.loopMode = newMode;
                await setQueue(guildId, queue);
                return interaction.reply({ content: `🔁 Loop mode set to **${newMode}**.`, ephemeral: true });
            }
            case 'volume_up': {
                const queue = await getQueue(guildId);
                if (!queue) return interaction.reply({ content: 'Nothing is playing.', ephemeral: true });

                let vol = queue.volume || 1.0;
                vol = Math.min(vol + 0.1, 2.0);
                queue.volume = vol;
                await setQueue(guildId, queue);

                const player = getPlayer(guildId);
                if (player && player.state.resource) player.state.resource.volume.setVolume(vol);

                return interaction.reply({ content: `🔊 Volume increased to ${(vol * 100).toFixed(0)}%.`, ephemeral: true });
            }
            case 'volume_down': {
                const queue = await getQueue(guildId);
                if (!queue) return interaction.reply({ content: 'Nothing is playing.', ephemeral: true });

                let vol = queue.volume || 1.0;
                vol = Math.max(vol - 0.1, 0.1);
                queue.volume = vol;
                await setQueue(guildId, queue);

                const player = getPlayer(guildId);
                if (player && player.state.resource) player.state.resource.volume.setVolume(vol);

                return interaction.reply({ content: `🔉 Volume decreased to ${(vol * 100).toFixed(0)}%.`, ephemeral: true });
            }
            case 'lyrics': {
                return interaction.reply({ content: 'Use `/lyrics <song name>` to fetch lyrics.', ephemeral: true });
            }
            case 'nowplaying': {
                return interaction.reply({ content: 'Use `/nowplaying` to see the current song.', ephemeral: true });
            }
            default:
                return interaction.reply({ content: 'Unknown button.', ephemeral: true });
        }
    }
});

// ✅ LOGIN
client.login(process.env.TOKEN);
