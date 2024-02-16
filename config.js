require('dotenv').config()

const config = {}

config.guildid = ''// Server ID 

config.bot = {
    token: process.env.TOKEN, // Bot Token (Change this in the .env File)
    user: {
        enabled: false, // If enabled the Name and Avatar will be overwritten and are permanent
        name: "Stats Bot",
        avatar: "You Photo",
    },
    activity_enabled: true, // If disabled Bot wont override Activity (if multiple Bots are running on same Token)
    activitys: [
        {
            name: "through the matrix",
            type: "Watching",
            status: "idle",
        },
        {
            name: "with your data",
            type: "Playing",
            status: "dnd",
        },
        {
            name: "in your life",
            type: "Competing",
            status: "online",
        },
    ],
    intervall: 10 * 1000, // Intervall of Activity Change
};

config.stats = {
    intervall: 5 * 60 * 1000, // Intervall of Stats Change (min 5 Minutes)
    // Observers how many Users have a specific Role
    roles: [
        {
            enabled: true,
            name: "👑︱Customers: {counter}",
            role: "1140405872250601523",
            channel: "1147185764233392188"
        },
    ],
    // Observers how may Channels are in one or mutliple Categories
    channels: [
        {
            enabled: true,
            name: "🎫︱Tickets: {counter}",
            categorys: ["1140462314743681186", "1140462360612589678", "1140459329242275930", "1140462467215007816"],
            channel: "1147185907049435216"
        }
    ],
    // Observers ammount of Messages in a Channel
    messages: [
        {
            enabled: true,
            name: "🙏︱Feedbacks: {counter}",
            channel_of_messages: "1140424294002868264",
            channel: "1147199154490196052"
        }
    ],
    // General Guild Stats
    guild: {
        users: {
            enabled: true,
            name: "👥︱Users: {counter}",
            channel: "1147185633559842908"
        },
        boosts: {
            enabled: true,
            name: "💕︱Boosts: {counter}",
            channel: "1147185812413358141"
        },
        roles: {
            enabled: false,
            name: "👑︱Roles: {counter}",
            channel: "1147185764233392188"
        },
        channels: {
            enabled: false,
            name: "🎫︱Channels: {counter}",
            channel: "1147185907049435216"
        },
        emojis: {
            enabled: false,
            name: "🎨︱Emojis: {counter}",
            channel: "1147185941666301440"
        },
        bans: {
            enabled: false,
            name: "🔨︱Bans: {counter}",
            channel: "1147185971660800000"
        },
        invites: {
            enabled: false,
            name: "📨︱Invites: {counter}",
            channel: "1147186001660800000"
        }
    }
}

module.exports = config;
