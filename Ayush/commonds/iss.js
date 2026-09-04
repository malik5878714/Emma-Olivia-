const request = require('request');

module.exports.config = {
  name: "iss",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀",
  description: "See the coordinates that the spacecraft is in Lac",
  commandCategory: "Tool",
  usages: "iss",
  cooldowns: 5,
  dependencies: {
    "request": ""
  }
};

module.exports.run = function({
  api,
  event,
  args,
  client,
  __GLOBAL
}) {
  return request(`http://api.open-notify.org/iss-now.json`, (err, response, body) => {
    if (err) throw err;
    var jsonData = JSON.parse(body);
    api.sendMessage(`Current location of International Space Station 🌌🌠🌃 \n-latitude: ${jsonData.iss_position.latitude}\n- Longitude: ${jsonData.iss_position.longitude}`, event.threadID, event.messageID);
  });
}