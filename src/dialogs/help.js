const message = `
支援指令：

* 您好
* 安安
* 地點
* 活動
* 說明
* 支援
* 重來
* 再見
* 請問
`.trim();

const step = (session) => {
  return session
    .send(message)
    .endDialog();
};

module.exports = (bot) => {
  const matches = /^說明$|^help$/i;
  return bot.dialog('help', step)
    .triggerAction({ matches });
};
