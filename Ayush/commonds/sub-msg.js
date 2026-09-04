const fs = require("fs");
module.exports.config = {
	name: "sub",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "sub",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀")==0 || event.body.indexOf("Sub")==0 || event.body.indexOf("Subscribe")==0 || event.body.indexOf("𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀")==0) {
		var msg = {
				body: "👋For Any Kind Of Help Contact On Telegram  Username 👉 @𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀rajput😇",
				attachment: fs.createReadStream(__dirname + `/noprefix/sub.mp3`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🔔", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
