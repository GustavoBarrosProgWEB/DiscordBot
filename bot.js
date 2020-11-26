// Instanciando a biblioteca do Discord
const Discord = require('discord.js');

// Capturando o arquivo JSON com as configurações (token, ids, etc.)
const config = require('./config.json');

require('dotenv').config();

// Capturando o arquivo JSON com frases
const frasesDoDia = require('./frasesDoDia.json');

// Capturando o arquivo JSON com frases
const frasesCmd = require('./frasesCmd.json');

// Cartão mensagem Embed
const msgEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('A.P.I. Bot')
    .setURL('https://discord.js.org/')
    .setDescription('__Bot do Canal de Programadores WEB__')
    .setThumbnail('https://media.discordapp.net/attachments/775852503589322787/776852304498262047/DiscordBOT.png')
    .addFields(
        { name: ':: Bem vindo ::', value: 'Aqui é um bom local para compatilhar conhecimento. Nossa filosofia é ***quanto mais compatilhares mais aprenderás***!' }
    )
    .addField(':: Autor ::', 'Gustavo Barros', true)
    .setTimestamp()
    .setFooter('Direitos reservados', '');

// "https://cdn.discordapp.com/attachments/" + <id do canal> + "/" + <ID avatar> + "/" + "DiscordBOT.png"
function pegaTempo() {

    let today = new Date();

    let hh = String(today.getHours()).padStart(2, '0');
    let mm = String(today.getMinutes()).padStart(2, '0');
    let dd = String(today.getDate()).padStart(2, '0');
    let mes = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let data = `${dd}/${mes}/${yyyy}`;
    let hora = `${hh}h${mm}`;

    return [data, hora];
}

// Função contador
var contPoint = '';
var cont = 0;
var tempo;

async function timeCount() {
    contPoint = contPoint + '.';
    cont++;
    // Configura o texto abaixo do nome do BOT,= chamado atividade.
    // client.user.setActivity(`24h Asssembly Bible!`);
    client.user.setActivity(`(${cont}) ${contPoint}`, { type: "STREAMING", url: "https://discord.js.org/" });

    tempo = setTimeout(timeCount, 5000);
    if (cont == 1000) {
        contPoint = '';
        cont = 0;
    }
    if (contPoint == '.....') {
        contPoint = '';
    }
}

// Instancia um cliente da classe Discord
const client = new Discord.Client();

// Adiciona o Token do BOT para logar no servidor Discord.
client.login(process.env.TOKEN);

// Captura o evento 'on', quando o cliente (BOT) consegue se conectar no servidor do Discord, retornando o nome do BOT (identificação do BOT)
client.on('ready', () => {

    // Envia uma mensagem com o nome do BOT para o console
    console.log(`Logado com o bot ${client.user.tag}.`);

    // Envia uma mensagem com a quantidade de usuários (client.users.cache.size) e em quantos servidores(client.guilds.cache.size) o BOT está atuando.
    console.log(`O bot foi iniciado, com ${client.users.cache.size} usuários e em ${client.guilds.cache.size} servidores.`);

    // Inicia a função assícrona startTime();
    timeCount()
});

client.on('raw', async dados => {

    // console.log(dados);

    // if (dados.t == 'PRESENCE_UPDATE' && client.guilds.cache.get('775852503589322782').members.cache.get(dados.d.user.id)) {

    //     let usuario = client.guilds.cache.get('775852503589322782').members.cache.get(dados.d.user.id);
    //     console.log(`dados.d.user.tag: ${usuario.user.username}, status: ${dados.d.status}, id: ${dados.d.user.id}`);

    // };
});


// client.on('presenceUpdate', (dadosUp) => {
    
//     console.log("dadosUp.userID: " + dadosUp.userID);
//     console.log("dadosUp.userID: " + dadosUp.status);
// });

// Captura o evento 'on', e o usuário envia uma mensagem, seja no canal ou no privado, o BOT retorna o nickname e a mensagem digitada.
client.on('message', (message) => {

    // Verifica se a messagem enviada foi de um BOT
    if (!message.author.bot) {

        let tHoraJSON = Object.keys(frasesCmd.hora).length;
        let tDataJSON = Object.keys(frasesCmd.data).length;
        let tHelpJSON = Object.keys(frasesCmd.help).length;
        let tFraseJSON = Object.keys(frasesDoDia).length;

        if (message.content === `${config.messagem.prefix}help`) message.reply(`\n${frasesCmd.help[Math.round(Math.random() * (tHelpJSON - 1) + 1)]}`);
        if (message.content === `${config.messagem.prefix}data`) message.reply(`\n${frasesCmd.data[Math.round(Math.random() * (tDataJSON - 1) + 1)]} **${pegaTempo()[0]}**. Aproveitem!`);
        if (message.content === `${config.messagem.prefix}hora`) message.reply(`\n${frasesCmd.hora[Math.round(Math.random() * (tHoraJSON - 1) + 1)]} **${pegaTempo()[1]}** hora(s).`);
        if (message.content === `${config.messagem.prefix}comandos`) message.reply(`\n${frasesCmd.comandos}`);
        if (message.content === `${config.messagem.prefix}frase`) message.reply(`\n*${frasesDoDia[Math.round(Math.random() * (tFraseJSON - 1) + 1)]}*`);
        if (message.content === `${config.messagem.prefix}salve`) message.reply(msgEmbed);
    }
});

// Captura o evento 'guildMemberAdd'. Ocorre quando um usuário acessa o canal com 'id' específico.
client.on("guildMemberAdd", (member) => {

    // Cartão mensagem Embed
    const msgEmbedWellC = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('A.P.I. Bot')
        .setURL('https://discord.js.org/')
        .setThumbnail('https://cdn.discordapp.com/attachments/754402567051542550/778289068525355058/DiscordBOT.png')
        .addFields(
            {
                name: member.user.username, value: 'Seja bem vindo(a) . Aqui é um bom local para compatilhar conhecimento. Nossa filosofia é quanto mais compatilhares mais aprenderá. Por favor, leia intruções iniciais e qualquer pode colocar sua dúvida no canal assuntos-gerais.'
            })
        .addField(':: Autor ::', 'Gustavo Barros', true)
        .setTimestamp()
        .setFooter('Direitos reservados', '');


    let servidor = client.guilds.cache.get(config.login.idServidor);

    // Cartão mensagem Embed
    const msgEmbedWellChannel = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("A.P.I. Bot")
        .setURL('https://discord.js.org/')
        .addFields(
            {
                name: ":: " + member.user.username + " ::", value: 'Entrou no nosso servidor. Seja bem vindo(a) desenvolvedor(a) de soluções.'
            })
        .setFooter("A.P.I. Bot", "https://cdn.discordapp.com/attachments/754402567051542550/778289068525355058/DiscordBOT.png")
        .setThumbnail("https://cdn.discordapp.com/avatars/" + member.user.id + "/" + member.user.avatar + ".png")
        .setTimestamp()
        .setURL("https://discord.js.org/")

    let channel = client.channels.cache.get(config.login.idChannelAGerais);

    channel.send(msgEmbedWellChannel);

    member.send(msgEmbedWellC);
});