const builder = require('botbuilder');

const utils = require('./utils');

const h4dialog = {
  location: require('./dialogs/location'),
  events: require('./dialogs/events'),
  welcome: require('./dialogs/welcome'),
  help: require('./dialogs/help'),
  support: require('./dialogs/support'),
  goodbye: require('./dialogs/goodbye'),
  greeting: require('./dialogs/greeting'),
  faq: require('./dialogs/faq'),
  ftu: require('./dialogs/ftu')
};

const app = (bot) => {
  h4dialog.location(bot);
  h4dialog.events(bot);
  h4dialog.welcome(bot);
  h4dialog.help(bot);
  h4dialog.support(bot);
  h4dialog.goodbye(bot);
  h4dialog.greeting(bot);
  h4dialog.faq(bot);
  h4dialog.ftu(bot);
  bot.dialog('qnamaker', utils.createQnAMakerDialog());

  // Acknowledge add to contacts list
  bot.on('contactRelationUpdate', (message) => {
    if ('add' === message.action) {
      const name = message.user
        ? message.user.name
        : null;

      const reply = new builder.Message()
        .address(message.address)
        .text(`${name}，您好！我是小四，很高興能為您服務！\n\n請輸入 **你好**`.trim());

      bot.send(reply);
    }
  });

  // log any bot errors into the console
  /* eslint-disable no-console */
  bot.on('error', (err) => console.error(err.message));
  /* eslint-enable no-console */
};

module.exports = app;
