const { prefix, allowedRoleId } = require('../config/config');
const player = require('../player');

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (!message.member.roles.cache.has(allowedRoleId)) {
      return message.reply("❌ You don't have permission to use music commands.");
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const queue = player.nodes.get(message.guild.id);

    if (command === 'play') {
      const query = args.join(' ');
      if (!query) return message.reply('🎵 Provide a song name or link!');
      const result = await player.search(query, { requestedBy: message.author });
      if (!result.tracks.length) return message.reply('❌ No results found.');

      const { track } = await player.play(message.member.voice.channel, result.tracks[0], {
        nodeOptions: { metadata: message.channel },
      });

      message.channel.send(`🎶 Now playing: **${track.title}**`);
    }

    if (command === 'skip') {
      if (!queue) return message.reply('🚫 Nothing playing.');
      queue.node.skip();
      message.reply('⏭️ Skipped!');
    }

    if (command === 'stop') {
      if (!queue) return message.reply('🚫 Nothing playing.');
      queue.delete();
      message.reply('⏹️ Stopped.');
    }

    if (command === 'queue') {
      if (!queue || !queue.tracks.length) return message.reply('🈳 Queue is empty.');
      const tracks = queue.tracks.map((track, i) => `${i + 1}. ${track.title}`).join('\n');
      message.channel.send(`📜 **Queue:**\n${tracks}`);
    }
  },
};
