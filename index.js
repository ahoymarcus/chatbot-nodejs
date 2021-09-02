require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const dialogflow = require('./dialogflow');
const youtube = require('./youtube');



const token = process.env.TELEGRAM_WEB_TOKEN;


const bot = new TelegramBot(token, { polling: true });



bot.on('message', async function(msg) {
	const chatId = msg.chat.id;
	console.log(msg.text);
	
	// Id vem do App Telegram como integer
	const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text);
	
	let responseText = dfResponse.text;
	if (dfResponse.intent === 'Tipo de atividade física') {
		responseText = await youtube.searchVideoUrl(responseText, dfResponse.fields);
	}
	
	
	//bot.sendMessage(chatId, 'Obrigado por sua mensagem');
	//bot.sendMessage(chatId, dfResponse.text);
	bot.message(chatId, responseText)
});








