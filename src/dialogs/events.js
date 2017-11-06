const builder = require('botbuilder');

const concom = {
  title: 'CONCOM X OCF 2017',
  subtitle: '台灣微軟辦公室',
  image: new builder.CardImage()
    .url('https://t.kfs.io/upload_images/70093/___-1-01_large.png'),
  action: new builder.CardAction()
    .type('openUrl')
    .title('查看地圖')
    .value('https://goo.gl/maps/TSb8je7SN8J2')
};

const regular = (date) => ({
  title: `HackingThursday 固定聚會 (${date})`,
  subtitle: '田中園 光華店',
  image: new builder.CardImage()
    .url('https://secure.meetupstatic.com/photos/event/6/0/0/highres_440341536.jpeg'),
  action: new builder.CardAction()
    .type('openUrl')
    .title('活動頁面')
    .value('https://www.meetup.com/hackingthursday/events/245185012/')
});

const createAttachment = ({ title, subtitle, image, action }) => {
  return new builder.HeroCard()
    .title(title)
    .subtitle(subtitle)
    .images([image])
    .buttons([action]);
};

const step = async(session) => {
  const message = new builder.Message()
    .attachmentLayout(builder.AttachmentLayout.carousel)
    .attachments([
      createAttachment(concom),
      createAttachment(regular('2017/11/23')),
      createAttachment(regular('2017/11/30'))
    ]);

  return session
    .send(message)
    .endDialog();
};

module.exports = (bot) => {
  const matches = /活動/i;
  return bot.dialog('events', step)
    .triggerAction({ matches });
};
