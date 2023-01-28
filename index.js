const express = require('express')
const openai = require('openai')
const tmi = require('tmi.js');
const {Configuration} = require('openai')
const { OpenAIApi } = require('openai')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
app.use(cors())
dotenv.config()
const configuration = new Configuration({
  apiKey: process.env.BOT_API_KEY,
})

const openaibot = new OpenAIApi(configuration);
const client = new tmi.Client({
  options: { debug: true },
  identity: {
    username: 'AI',
    password: 'oauth:vc7rngup39txz99gh3vmltrgi3n0md'
  },
  channels: ['j_umbo']
});
client.connect().catch(console.error);

client.on('message', async (channel, tags, message, self) => {
  const command = message.split(' ')[0]
  var response
  if (command.toLowerCase() === '!ai') {
      response = await openaibot.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    })
    client.say(channel, `@${tags.username}, ${response.data.choices[0].text}`);
    console.log(response.data.choices[0].text);
  }
})