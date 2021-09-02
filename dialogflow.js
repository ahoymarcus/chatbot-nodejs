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


async function sendMassage(chatId, message) {
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
};








