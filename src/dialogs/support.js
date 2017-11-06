const builder = require('botbuilder');

const step1 = (session) => {
  const prompt = '請留下您的意見：';
  return builder.Prompts.text(session, prompt);
};

const step2 = (session, results) => {
  const response = results.response;
  session.dialogData.destination = response;

  const prompt = '您確定要送出嗎？';
  const choices = ['確定', '取消'];
  const maxRetries = 3;
  const retryPrompt = '無效選項，請重新輸入。';

  session.send(`您的留言是：\n\n${response}`);
  return builder.Prompts.choice(
    session, prompt, choices, {
      maxRetries, retryPrompt,
      listStyle: builder.ListStyle.button
    }
  );
};

const step3 = (session, result) => {
  const selection = result.response.entity;
  switch (selection) {
  case '確定':
    return session
      .send('感謝您的意見，留言已送出。')
      .endDialog();
  case '取消':
    return session
      .send('取消留言。')
      .endDialog();
  default:
    return;
  }
};

module.exports = (bot) => {
  return bot.dialog('support', [step1, step2, step3])
    .triggerAction({
      matches: /留言$|支援$|^support$|^feedback$/i
    })
    .reloadAction('startOver', '好的，對話已重設。', {
      matches: /^重來$|^reset$|^start over$/i
    })
    .endConversationAction('endConversationAction', '謝謝光臨，再見。', {
      matches: /^bye$|^goodbye$|^掰{2}|再見/i
    });
};
