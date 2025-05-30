const { Player } = require('discord-player');
const { client } = require('../index');
const { useExtractor } = require('@discord-player/extractor');

const player = new Player(client);
useExtractor(player);

module.exports = player;
