const { App } = require('@slack/bolt');

const app = new App({
    token: '',
    signingSecret: ''
});

(async () => {
    // Start your app
    await app.start(process.env.PORT || 8080);
  
    console.log('⚡️ Bolt app is running!');
  })();

  app.message('hello', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    console.log(message);
    await say(`Hey there <@${message.user}>!`);
  });