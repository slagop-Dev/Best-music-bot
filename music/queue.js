import { QueueModel } from '../database/models/Queue.js';

export async function getQueue(guildId) {
    let queue = await QueueModel.findOne({ guildId });
    if (!queue) {
        queue = new QueueModel({ guildId, songs: [] });
        await queue.save();
    }
    return queue;
}

export async function setQueue(guildId, updatedQueue) {
    await QueueModel.findOneAndUpdate({ guildId }, updatedQueue, { upsert: true });
}

export async function clearQueue(guildId) {
    await QueueModel.deleteOne({ guildId });
}
