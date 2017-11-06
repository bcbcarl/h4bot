const message = `
歡迎使用 Hacking Thursday 小幫手。

若要重設對話，請輸入：**重來** 或 **reset** 或 **start over**。

若要查看使用說明和範例，請輸入 **說明** 或 **help**。
`.trim();

const step = (session) => {
  return session
    .send(message)
    .beginDialog('ftu');
};

module.exports = (bot) => {
  const matches = /^hey$|^hi$|^[您你妳]好|^哈囉/i;
  return bot.dialog('welcome', step)
    .triggerAction({ matches });
};
