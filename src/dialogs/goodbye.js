const step = (session) => {
  const message = '不客氣，為您服務是我們的榮幸。';
  return session
    .send(message)
    .endDialog();
};

module.exports = (bot) => {
  const matches = /[謝掰]{2}|再見/i;

  return bot.dialog('goodbye', step)
    .triggerAction({ matches });
};
