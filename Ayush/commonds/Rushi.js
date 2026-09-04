module.exports.config = {
 name: "𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀a",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀",
 description: "Random 𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀a",
 commandCategory: "random-img",
 usages: "𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀a",
 cooldowns: 3
};

module.exports.run = async ({ api, event }) => {
 const axios = require('axios');
 const request = require('request');
 const fs = require("fs");
 axios.get('https://saikiapi-v3-production.up.railway.app/holo/𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀a').then(res => {
 let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
 let callback = function () {
     api.sendMessage({
      attachment: fs.createReadStream(__dirname + `/cache/𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀a.${ext}`)
     }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀a.${ext}`), event.messageID);
   api.setMessageReaction("✅", event.messageID, (err) => {}, true);
    };
    request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀a.${ext}`)).on("close", callback);
   })
      .catch(err => {
                     api.sendMessage("there's something problem while generating photo, please try again!", event.threadID, event.messageID);
    api.setMessageReaction("☹️", event.messageID, (err) => {}, true);
                  })    
}
