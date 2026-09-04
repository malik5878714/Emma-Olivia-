const fs = require("fs");
module.exports.config = {
	name: "sus",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "sus",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("amogus")==0 || event.body.indexOf("Amogus")==0 || event.body.indexOf("sus")==0 || event.body.indexOf("Sus")==0) {
		var msg = {
				body: "ඞ",
				attachment: fs.createReadStream(__dirname + `/noprefix/sus.mp3`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😱", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }