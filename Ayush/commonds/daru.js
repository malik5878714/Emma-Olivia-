const fs = require("fs");
module.exports.config = {
	name: "daru",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "daru",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Daru")==0 || event.body.indexOf("daru")==0 || event.body.indexOf("Drink")==0 || event.body.indexOf("drink")==0) {
		var msg = {
				body: "Aajao milke pite hai 🍻🍷🍺",
				attachment: fs.createReadStream(__dirname + `/noprefix/daru.mp4`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🍺", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }