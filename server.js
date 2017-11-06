const utils = require('./src/utils');
const app = require('./src/app');

// Setup Restify Server
const server = utils.createServer();

// Create chat connector for communicating with the Bot Framework Service
const connector = utils.createConnector();

// Listen for messages from users
server.post('/api/messages', connector.listen());

// Create h4bot to receive messages from the user
const bot = utils.createBot(
  connector, (session) => session.beginDialog('greeting')
);

app(bot);
