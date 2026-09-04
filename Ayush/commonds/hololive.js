module.exports.config = {
    name: "hololive",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀",
    description: "Holo Photo Gallery",
    commandCategory: "vtuber",
    usages: "[𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀a/pekora/coco/gura/marine]",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  const { threadID, messageID } = event;
  var type;
  switch(args[0]) {
    case "𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀a":
    case "𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀a":
    type = "𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀a";
    break;
    case "pekora":
    case "Pekora":
    case "peko":
    case "Peko":
    type = "pekora";
    break;
    case "coco": 
    case "Coco":
    type = "coco";
    break;
    case "gura":
    case "Gura":
    case "gawr":
    case "Gawr":
    type = "gura";
    break;
    case "marine":
    case "Marine":
    case "Marin":
    type = "marine";
    break;
    default:
    return api.sendMessage(`=====Tags=====\n𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀a, gura, coco, marine, pekora`, threadID, messageID);
    break;
  }
axios.get(`https://api.randvtuber-saikidesu.ml?character=${type}`).then(res => {
let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
    let callback = function () {
                    api.sendMessage({
                        body: `=== ${res.data.name} ===\nAvailable: ${res.data.count}\nAuthor: ${res.data.author}`,
                        attachment: fs.createReadStream(__dirname + `/cache/${type}.${ext}`)
                    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${type}.${ext}`), event.messageID);
   api.setMessageReaction("✅", event.messageID, (err) => {}, true);
                };
                request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/${type}.${ext}`)).on("close", callback);
            })
    .catch(err => {
                     api.sendMessage("there's something problem while generating photo, please try again!", event.threadID, event.messageID);
    api.setMessageReaction("☹️", event.messageID, (err) => {}, true);
                  })     
}