const dialogflow = require('dialogflow');

// Crie uma conta de uso no Dialogflow da Google
const configs = require('./configs/agent');


const sessionClient = new dialogFlow.SessionsClient({
	projectId: configs.projectId,
	credentials: {
		private_key: configs.private_key,
		client_email: configs.client_email
	}
});


async function sendMessage(chatId, message) {
	const sessionPath = sessionClient.sessionPath(configs.project_id, chatId);
	
	const request = {
		session: sessionPath,
		queryInput: {
			text: {
				text: message,
				languageCode: 'pt-br'
			}
		}
	};
	
	const responses = await sessionClient.detectIntent(request);
	const result = responses[0].queryResult;
	
	
	//console.log(JSON.stringify(result, null, 2));
	
	return {
		text: result.fulfillmentText,
		intent: result.intent.displayName,
		fields: result.parameters.fields
	};
};


// Teste
//sendMessage('12938123', 'oi');

module.exports.sendMessage = sendMessage;


