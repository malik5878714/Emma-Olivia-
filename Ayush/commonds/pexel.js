const axios = require("axios");
const fs = require("fs");
const path = require("path");

const API_KEY = "❌❌❌❌❌";

module.exports = {
  config: {
    name: "pexels",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "𝐄𝐌𝐌𝐀 𝐎𝐋𝐈𝐕𝐈𝐀",
    description: "Search free photos or videos from Pexels",
    commandCategory: "media",
    usages: "pexels <query> | pexels video <query>",
    cooldowns: 3
  },

  run: async ({ api, event, args }) => {
    const isVideo = args[0] && args[0].toLowerCase() === "video";
    const query = isVideo ? args.slice(1).join(" ") : args.join(" ");
    if (!query) return api.sendMessage("🔎 Search keyword likho bhai.", event.threadID);

    const endpoint = isVideo
      ? `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=10`
      : `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5`;

    try {
      const res = await axios.get(endpoint, {
        headers: { Authorization: API_KEY }
      });

      if (isVideo) {
        const videos = res.data.videos;
        if (!videos.length) return api.sendMessage("❌ Koi video nahi mila.", event.threadID);

        let msg = `🎬 𝗣𝗲𝘅𝗲𝗹𝘀 𝗩𝗶𝗱𝗲𝗼 𝗥𝗲𝘀𝘂𝗹𝘁𝘀:\n\n`;
        videos.forEach((vid, i) => {
          msg += `${i + 1}. 👤 ${vid.user.name || "Unknown"}\n`;
        });
        msg += "\n👉 Reply 1–10 to download a video.";

        return api.sendMessage(msg, event.threadID, (err, info) => {
          global.client.handleReply.push({
            name: module.exports.config.name,
            type: "video",
            data: videos,
            messageID: info.messageID,
            author: event.senderID
          });
        });
      } else {
        const photos = res.data.photos;
        if (!photos.length) return api.sendMessage("❌ Koi photo nahi mila.", event.threadID);

        const files = [];

        for (let i = 0; i < photos.length; i++) {
          const pic = photos[i];
          const imageUrl = pic.src.medium;
          const ext = path.extname(imageUrl).split("?")[0] || ".jpg";
          const imagePath = path.join(__dirname, "cache", `pexels_${Date.now()}_${i}${ext}`);

          const imageRes = await axios({ url: imageUrl, responseType: "stream" });
          const writer = fs.createWriteStream(imagePath);

          await new Promise((resolve, reject) => {
            imageRes.data.pipe(writer);
            writer.on("finish", resolve);
            writer.on("error", reject);
          });

          files.push(fs.createReadStream(imagePath));
          setTimeout(() => fs.existsSync(imagePath) && fs.unlinkSync(imagePath), 10000);
        }

        return api.sendMessage({
          body: `📷 𝗧𝗼𝗽 ${photos.length} 𝗣𝗵𝗼𝘁𝗼𝘀 𝗼𝗳 "${query}"`,
          attachment: files
        }, event.threadID);
      }

    } catch (err) {
      console.error(err);
      return api.sendMessage("❌ Error from Pexels API.", event.threadID);
    }
  },

  handleReply: async ({ api, event, handleReply }) => {
    const { type, data, author } = handleReply;
    if (event.senderID !== author) return;

    const index = parseInt(event.body);
    if (isNaN(index) || index < 1 || index > data.length)
      return api.sendMessage("❗ Valid number bhejo (1–10)", event.threadID);

    const video = data[index - 1];
    const videoUrl = video.video_files.find(v => v.quality === "sd" || v.quality === "hd")?.link;
    const ext = ".mp4";
    const filePath = path.join(__dirname, "cache", `pexels_video_${Date.now()}${ext}`);

    try {
      const vidRes = await axios({ url: videoUrl, responseType: "stream" });
      const writer = fs.createWriteStream(filePath);

      await new Promise((resolve, reject) => {
        vidRes.data.pipe(writer);
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

      await api.sendMessage({
        body: `🎬 Video by: ${video.user.name}`,
        attachment: fs.createReadStream(filePath)
      }, event.threadID, () => {
        setTimeout(() => fs.existsSync(filePath) && fs.unlinkSync(filePath), 10000);
      });
    } catch (err) {
      console.error("❌ Video download failed:", err.message);
      api.sendMessage("❌ Video download error.", event.threadID);
    }
  }
};
