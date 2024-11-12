require('dotenv').config()
const { Client, GatewayIntentBits } = require('discord.js');
const EventEmitter = require('node:events');
const eventEmitter = new EventEmitter();
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const token = process.env.DISCORD_BOT_TOKEN;
const channelId = process.env.DISCORD_CHANNEL_ID;

client.once('ready', () => {
    eventEmitter.emit('ready');
});

const sendMessage = async (content) => {
    const channel = await client.channels.fetch(channelId);
    channel.send(content);
};

client.login(token);

module.exports = { eventEmitter, sendMessage };