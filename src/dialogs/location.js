const builder = require('botbuilder');

const imageUrl = 'https://lh3.ggpht.com/p/AF1QipPFoG8mFwlQLoVI9Mq7wXYXtpvga5Ryr6SE2KHb=s1024';
const googleMapsUrl = 'https://goo.gl/maps/kREzM4qQ4sp';

const card = {
  title: '田中園光華店',
  subtitle: '100台北市中正區臨沂街1號',
  image: new builder.CardImage()
    .url(imageUrl),
  action: new builder.CardAction()
    .type('openUrl')
    .title('查看地圖')
    .value(googleMapsUrl)
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
  const matches = /田中園|地點/i;
  return bot.dialog('location', step)
    .triggerAction({ matches });
};
