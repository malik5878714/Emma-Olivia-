module.exports.config = {
  name: "goiadmin",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀",
  description: "Bot will rep ng tag admin or rep ng tagbot ",
  commandCategory: "Other",
  usages: "",
  cooldowns: 1
};
module.exports.handleEvent = function({ api, event }) {
  if (event.senderID !== "61594011388225") {
    var aid = ["61594011388225"];
    for (const id of aid) {
    if ( Object.keys(event.mentions) == id) {
      var msg = ["𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀 ko mention kiya gaya hai.", "👑 𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀 — Admin ID: 61594011388225", "Owner: 𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀 | ID: 61594011388225"];
      return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
    }
    }}
};
module.exports.run = async function({}) {
        }
