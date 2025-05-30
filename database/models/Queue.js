import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    title: String,
    url: String,
    duration: String,
    thumbnail: String,
    requestedBy: String
});

const queueSchema = new mongoose.Schema({
    guildId: String,
    songs: [songSchema],
    loopMode: { type: String, default: 'off' },
    volume: { type: Number, default: 1.0 }
});

export const QueueModel = mongoose.model('Queue', queueSchema);
