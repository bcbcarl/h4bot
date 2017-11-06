const step = async(session) => {
  try {
    return await session
      .sendTyping()
      .beginDialog('qnamaker')
      .endDialog();
  } catch (err) {
    return session.error(err);
  }
};

module.exports = (bot) => {
  const matches = /[?何呀呢哪啊問嗎怎誰麼？]/i;
  return bot.dialog('faq', step)
    .triggerAction({ matches });
};
