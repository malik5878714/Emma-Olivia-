module.exports.config = {
	name: "fact",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀",
	description: "random facts",
	commandCategory: "...",
	cooldowns: 5
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
const res = await axios.get(`https://api.popcat.xyz/fact`);
var fact = res.data.fact;
return api.sendMessage(`Did you know?>> ${fact}`, event.threadID, event.messageID)
}