const { App } = require('@slack/bolt');

const app = new App({
    token: process.env['SLACK_TOKEN'],
    signingSecret: process.env['SLACK_SECRET']
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

  app.message('show view', async({ ack, body, client}) => {
    try {
      const result = await client.views.publish({
        view_id: body.view.id,
        hash: body.view.hash,
        view: {
          type: 'modal',
          // View identifier
          callback_id: 'view_1',
          title: {
            type: 'plain_text',
            text: 'Updated modal'
          },
          blocks: [
            {
              type: 'section',
              text: {
                type: 'plain_text',
                text: 'You updated the modal!'
              }
            },
            {
              type: 'image',
              image_url: 'https://media.giphy.com/media/SVZGEcYt7brkFUyU90/giphy.gif',
              alt_text: 'Yay! The modal was updated'
            }
          ]
        }
      });
    }catch (error) {
      console.error(error);
    }

  });
  app.event('app_home_opened', async ({ event, client }) => {
    try {
      // Call views.publish with the built-in client
      const result = await client.views.publish({
        // Use the user ID associated with the event
        user_id: event.user,
        view: {
          // Home tabs must be enabled in your app configuration page under "App Home"
          "type": "home",
          "blocks": [
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": "*Welcome home, <@" + event.user + "> :house:*"
              }
            },
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": "Learn how home tabs can be more useful and interactive <https://api.slack.com/surfaces/tabs/using|*in the documentation*>."
              }
            }
          ]
        }
      });
  
      console.log(result);
    }
    catch (error) {
      console.error(error);
    }
  });