import { createAudioPlayer, createAudioResource, AudioPlayerStatus, NoSubscriberBehavior, joinVoiceChannel, getVoiceConnection } from '@discordjs/voice';
import ytdl from 'ytdl-core';

const players = new Map();

export function getPlayer(guildId) {
    return players.get(guildId);
}

export function createPlayer(guildId) {
    const player = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause,
        },
    });

    players.set(guildId, player);
    return player;
}

export async function playSong(guild, voiceChannel, song, volume = 1.0) {
    let connection = getVoiceConnection(guild.id);
    if (!connection) {
        connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
        });
    }

    let player = getPlayer(guild.id);
    if (!player) player = createPlayer(guild.id);

    const stream = ytdl(song.url, { filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1 << 25 });
    const resource = createAudioResource(stream, { inlineVolume: true });
    resource.volume.setVolume(volume);

    player.play(resource);

    connection.subscribe(player);

    return player;
}
