const builder = require('botbuilder');

const imageUrl = 'https://fb-s-b-a.akamaihd.net/h-ak-fbx/v/t1.0-9/23658887_1644437445579306_4743027373877791133_n.jpg?oh=47eb0b94c62675d8442f7d6dc32c2d53&oe=5A97ECFE&__gda__=1520807189_ca499783d10cf542bb05c8c2b32545be';
const h4Url = 'http://www.hackingthursday.org/';

const card = {
  title: '快樂星期天，幸福每一天',
  subtitle: '知福、惜福、再培福',
  image: new builder.CardImage()
    .url(imageUrl),
  action: new builder.CardAction()
    .type('openUrl')
    .title('H4 官網')
    .value(h4Url)
};

const createAttachment = () => {
  return new builder.HeroCard()
    .title(card.title)
    .subtitle(card.subtitle)
    .images([card.image])
    .buttons([card.action]);
};

const step = async(session) => {
  const message = new builder.Message()
    .attachmentLayout(builder.AttachmentLayout.list)
    .attachments([createAttachment()]);

  return session
    .send(message)
    .endDialog();
};

module.exports = (bot) => {
  const matches = /[早午晚平安]安|感恩|喜樂|祝福/i;
  return bot.dialog('greeting', step)
    .triggerAction({ matches });
};
