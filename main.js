require('dotenv').config()

const http = require('node:http');
const bot = require('./bot');
const HOSTS = process.env.HOSTS ? process.env.HOSTS.split(',') : [];
const TIMEOUT = process.env.TIMEOUT || 5000;

const ping = () => {
    setInterval(() => {
        HOSTS.forEach(host => {
            http.get(host, (response) => {
                const { statusCode } = response;
                if (statusCode === 200) {
                    console.log(`${host} is up and running.`);
                }
            }).on('error', (error) => {
                bot.sendMessage(`Error: ${error.message} - ${host}`);
            });
        });
    }, TIMEOUT);
}

bot.eventEmitter.on('ready', () => {
    ping();
    console.log('Bot is ready and listening.');
});