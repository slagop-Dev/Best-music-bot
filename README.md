# 🎵 Discord Music Bot

A powerful and feature-rich Discord Music Bot built with Node.js and Discord.js. Play music from YouTube using slash commands, interactive buttons, and advanced queue control.

![GitHub repo size](https://img.shields.io/github/repo-size/slagop-Dev/discord-music-bot?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/slagop-Dev/discord-music-bot?style=flat-square)
![License](https://img.shields.io/github/license/slagop-Dev/discord-music-bot?style=flat-square)
![Node version](https://img.shields.io/badge/node-18.x-blue?style=flat-square)

---

## 🚀 Features

- 🎶 Play songs via YouTube URLs or search terms
- 🧠 Intelligent queue system
- ⏸️ Pause, resume, skip, stop commands
- 📜 Full queue display with pagination
- 🔁 Loop/Repeat support (track or queue)
- 📂 Playlist support
- 💬 Interactive buttons & rich embed interface
- ✅ Slash command support with autocomplete

---

## 📁 Project Structure

```bash
discord-music-bot/
├── commands/
├── events/
├── utils/
├── config/
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

---

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/slagop-Dev/discord-music-bot.git
cd discord-music-bot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and fill it like this:

```env
# .env
TOKEN=your-discord-bot-token
CLIENT_ID=your-bot-client-id
GUILD_ID=your-server-id (optional for dev testing)
```

> 🔐 You can rename `.env.example` to `.env`

---

## ▶️ Run the Bot

For production:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

---

## 📦 Available Slash Commands

- `/play [song/link]` - Plays a song from YouTube
- `/pause` - Pauses the current track
- `/resume` - Resumes playback
- `/skip` - Skips to the next track
- `/stop` - Stops and clears the queue
- `/queue` - Shows the current queue
- `/loop` - Loops the current song or entire queue
- `/clear` - Clears the current queue

---

## 📸 Screenshots

> *(Add screenshots of your bot running in Discord here)*

---

## 📂 .gitignore

```gitignore
node_modules/
.env
.DS_Store
logs/
*.log
npm-debug.log*
```

---

## 📄 .env.example

```env
# Discord Bot Token
TOKEN=your-bot-token

# Application (Bot) Client ID
CLIENT_ID=your-client-id

# Development Guild ID (optional for testing slash commands)
GUILD_ID=your-guild-id
```

---

## 👥 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/slagop-Dev/discord-music-bot/issues).

### 🛠️ To Contribute

```bash
git clone https://github.com/slagop-Dev/discord-music-bot.git
cd discord-music-bot
npm install
```

Make your changes and submit a pull request!

---

## 📃 License

This project is licensed under the **MIT License**.  
See the [LICENSE](https://github.com/slagop-Dev/discord-music-bot/blob/main/LICENSE) file for details.

---

## 🔗 Connect with Me

- GitHub: [@slagop-Dev](https://github.com/slagop-Dev)
- Discord: `grim.echo`

---

> ✨ Don’t forget to ⭐ the repo if you find this helpful!
