const fs = require('fs');
const restify = require('restify');
const builder = require('botbuilder');
const builder_cognitiveservices = require('botbuilder-cognitiveservices');

const createServer = () => {
  const server = restify.createServer();
  const port = process.env.PORT || 3978;

  /* eslint-disable no-console */
  server.listen(port, () =>
    console.log('%s listening to %s', server.name, server.url)
  );
  /* eslint-enable no-console */

  return server;
};

const createConnector = () => {
  const defaultOptions = {
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    stateEndpoint: process.env.BotStateEndpoint,
    openIdMetadata: process.env.BotOpenIdMetadata
  };

  const options = fs.existsSync('/.dockerenv')
    ? { ...defaultOptions, appId: null, appPassword: null }
    : defaultOptions;

  const connector = new builder.ChatConnector(options);

  return connector;
};

const createQnAMakerRecognizer = () => {
  const options = {
    knowledgeBaseId: process.env.QnAKnowledgebaseId,
    subscriptionKey: process.env.QnASubscriptionKey
  };

  const recognizer = new builder_cognitiveservices
    .QnAMakerRecognizer(options);

  return recognizer;
};

const createQnAMakerDialog = () => {
  const recognizer = createQnAMakerRecognizer();

  const options = {
    recognizers: [recognizer],
    defaultMessage: '這個我也不太清楚，你要問問其他值日生。',
    qnaThreshold: 0.3
  };

  const dialog = new builder_cognitiveservices
    .QnAMakerDialog(options);

  return dialog;
};

const createBot = (connector, defaultDialog) => {
  const bot = new builder.UniversalBot(connector, defaultDialog);
  return bot;
};

module.exports = {
  createServer,
  createConnector,
  createQnAMakerDialog,
  createBot
};
