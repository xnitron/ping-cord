require('dotenv').config()

const http = require('node:http');
const https = require('node:https');
const bot = require('./bot');
const HOSTS = process.env.HOSTS ? process.env.HOSTS.split(',') : [];
const TIMEOUT = process.env.TIMEOUT || 5000;
const TIMEOUT_STATUS_CODE = process.env.TIMEOUT_STATUS_CODE || 30000;

const ping = (action, ms) => {
    setInterval(() => {
        HOSTS.forEach(host => {
            const protocol = host.startsWith('https://') ? https : http;
            protocol.get(host, (response) => action({ response, host }))
                .on('error', (error) => {
                    bot.sendMessage(`Error: ${error.message} - ${host}`);
                });
        });
    }, ms);
}

bot.eventEmitter.on('ready', () => {
    ping((_) => ({}), TIMEOUT);
    ping(({ response, host }) => (bot.sendMessage(`Host ${host} - status code ${response.statusCode}. ${response.headers.date}`)), TIMEOUT_STATUS_CODE);
});

bot.eventEmitter.on('error', (error) => {
    console.error(error);
});