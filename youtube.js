const YouTube = require('youtube-node');

const config = require('./configs/youtube');



const youtube = new YouTube();
youtube.setKey(config.key);


function searchVideoURL(message, queryText) {
	return new Promise((resolve, reject) => {
		youtube.search(`Exercício em casa para quarentena ${queryText}`, 2, function(error, result) {
			
			if (!error) {
				// Mapeando e filtrando o obj result
				const videoIds = result.items.map((item) => item.id.videoId).filter(item => item);
				const youtubeLinks = videoIds.mpa(videoId => `https:/www.youtube.com/whatch?v=${videoId}`);
				resolve(`${message} ${youtubeLinks.join(', ')}`);
			} else {
				//console.log('Deu erro!');
				reject('Deu erro!');
			}
		});
	});
};


module.exports.searchVideoURL = searchVideoURL;






