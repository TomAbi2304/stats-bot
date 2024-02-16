const discord = require('discord.js');

const client = new discord.Client({
    intents: [
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.GuildMembers,
        discord.GatewayIntentBits.GuildModeration,
        discord.GatewayIntentBits.GuildMessages,
        discord.GatewayIntentBits.GuildMessageReactions,
        discord.GatewayIntentBits.GuildInvites,
        discord.GatewayIntentBits.GuildMessageTyping,
        discord.GatewayIntentBits.GuildPresences,

    ],
});

const config = require('./config.js');

async function updateStats() {
    // console.log('Updating Stats...')
    const rolestats = config.stats.roles;
    const channelstats = config.stats.channels;
    const messagestats = config.stats.messages;

    let guild 
    
    try {
        guild = await client.guilds.fetch(config.guildid);
    } catch (error) {
        console.log("Please ensure that the bot is on the server and you have enterd to correct Guild ID in the config.js file.")
        process.exit(1)
    }

    rolestats.forEach(async rolestat => {
        if (rolestat.enabled) {
            const role = guild.roles.cache.get(rolestat.role);
            const members = role.members.size;
            const channel = guild.channels.cache.get(rolestat.channel);
            channel.setName(rolestat.name.replace('{counter}', members));
        }
    })

    channelstats.forEach(channelstat => {
        if (channelstat.enabled) {
            let channels = 0
            channelstat.categorys.forEach(async category => {
                const categorychannels = guild.channels.cache.filter(channel => channel.parentId === category);
                channels += categorychannels.size;
            })
            const channel = guild.channels.cache.get(channelstat.channel);
            channel.setName(channelstat.name.replace('{counter}', channels));
        }
    })

    messagestats.forEach(async messagestat => {
        if (messagestat.enabled) {
            const channel = guild.channels.cache.get(messagestat.channel_of_messages);
            const channelmessages = await channel.messages.fetch()
            const ammountofmsgs = channelmessages.size
            const channel2 = guild.channels.cache.get(messagestat.channel);
            channel2.setName(messagestat.name.replace('{counter}', ammountofmsgs));
        }
    })

    Object.keys(config.stats.guild).forEach(async key => {
        if (config.stats.guild[key].enabled) {
            const channel = guild.channels.cache.get(config.stats.guild[key].channel);
            if (key === 'users') 
                channel.setName(config.stats.guild[key].name.replace('{counter}', guild.memberCount));
            else if (key === 'boosts') 
                channel.setName(config.stats.guild[key].name.replace('{counter}', guild.premiumSubscriptionCount));
            else if (key === 'roles') {
                channel.setName(config.stats.guild[key].name.replace('{counter}', guild.roles.cache.size));
            } else if (key === 'channels') {
                channel.setName(config.stats.guild[key].name.replace('{counter}', guild.channels.cache.size));
            } else if (key === 'emojis') {
                channel.setName(config.stats.guild[key].name.replace('{counter}', guild.emojis.cache.size));
            } else if (key === 'bans') {
                channel.setName(config.stats.guild[key].name.replace('{counter}', guild.bans.cache.size));
            } else if (key === 'invites') {
                const invites = await guild.fetchInvites();
                channel.setName(config.stats.guild[key].name.replace('{counter}', invites.size));
            }
        }
    })
}

client.on('ready', () => {
    console.log('Logged in as ' + client.user.tag + '!')
    updateStats();
    setInterval(async () => {
        await updateStats();
    }, config.stats.intervall)
    if (!config.bot.activitys) return
    if (!config.bot.intervall) return
    if (!config.bot.activity_enabled) return
    let i = 0
    let j = config.bot.activitys.length - 1

    setInterval(() => {
        const activity = config.bot.activitys[i]
        client.user.setPresence({
            activities: [{
                name: activity.name,
                type: discord.ActivityType[activity.type]
            }],
            status: activity.status
        });
        i++
        if (i > j) i = 0
    }, config.bot.intervall);
})

client.login(config.bot.token);
