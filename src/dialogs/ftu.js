const builder = require('botbuilder');

const choiceOption = {
  location: '聚會地點',
  events: '相關活動',
  support: '我要留言'
};

const promptStep = (session) => {
  const prompt = '請選擇您要的操作：';
  const choices = [
    choiceOption.location,
    choiceOption.events,
    choiceOption.support
  ];
  const maxRetries = 3;
  const retryPrompt = '無效選項';

  builder.Prompts.choice(
    session, prompt, choices, {
      maxRetries, retryPrompt,
      listStyle: builder.ListStyle.button
    }
  );
};

const triageStep = (session, result) => {
  const exhaustedAttempts = '重試次數過多，請稍候再試。';

  if (!result.response) {
    // exhausted attempts and no selection, start over
    session.send(exhaustedAttempts);
    return session.endDialog();
  }

  // on error, start over
  session.on('error', (err) => session.error(err));

  // continue on proper dialog
  const selection = result.response.entity;
  switch (selection) {
  case choiceOption.location:
    return session.beginDialog('location');
  case choiceOption.events:
    return session.beginDialog('events');
  case choiceOption.support:
    return session.beginDialog('support');
  default:
    return;
  }
};

const steps = [promptStep, triageStep];

module.exports = (bot) => {
  const matches = /^重來$|^reset$|^start over$/i;
  return bot.dialog('ftu', steps)
    .reloadAction('startOver', '好的，對話已重設。', { matches });
};
