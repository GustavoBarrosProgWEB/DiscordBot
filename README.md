# README-ME (Step-by-step)

>## :: Preparação do ambiente ::
<br>

<u>Inicia um projeto com dependências</u>
<br>

```npm init```<br><br>

<u>Instala o pacote do discord</u>
<br>

- o parâmetro ***--save*** coloca no arquivo JSON o discord na lista de dependências.

```npm install discord --save discordo.js```<br><br>

<u>No arquivo JSON</u>
<br>

- Alterar o arquivo 'main.js' para 'core.js', nome do arquivo script

```"main": "bot.js",```<br>

- Adiciona a linha de comando ***npm start*** na seção ***script***. Quando se digita este comando o Node.js irá executar o script ***core.js***.

```"start": "node bot.js"```<br>

<br>

>## :: Implementação ::
<br>

<u>Adicionando e logando o BOT no Discord</u><br>

- Instanciando a biblioteca do Discord

```const Discord = require('discord.js');```<br>

- Instancia um cliente da classe Discord

```const client = new Discord.Client();```<br>

- Captura o evento ***'on'*** (quando o cliente "BOT" consegue se conectar no servidor do Discord), retornando o nome do BOT (identificação do BOT)

<code>
client.on('ready', () => { <br>
&nbsp;&nbsp;&nbsp;&nbsp;console.log('Logado com o bot ${client.user.tag}.\'); <br>
});
</code><p>

- Adiciona o Token do BOT para logar no servidor Discord.

```client.login("<token do BOT>");```<br>

- Aconselhável testar se o BOT está logando no servidor, chamando o scritp ***core*** através do comando ***start*** no terminal *shell power*.

```npm start```<br>

<u>Capturando mensagem pelo BOT</u><br>

- Através do evento ***'on'***, o BOT captura a mensagem enviada pelo usuário, seja no canal ou no privado, o BOT retorna o nickname e a mensagem digitada.

<code>
client.on('message', (msg) => {<br>
&nbsp;&nbsp;&nbsp;&nbsp;console.log(`${msg.author.username}: ${msg.content}`);<br>
});<br>
</code>

- Como o BOT verifica todas as mensagens que foram enviadas para o canal, ou para o BOT (no privado), faz-se necessário verificação se o ***author*** da mensagem foi o próprio BOT, para que ele não fique mandando mensagens em <em>loop</em>.

<code>if (!msg.author.bot) {<br>
&nbsp;&nbsp;&nbsp;&nbsp;<código><br>
}</code>

- Captura de mensagem para hora, data, help e frasesDoDia no  arquivo JSON. Para pegar o tamanho do arquivo JSON utiliza-se a propriedade <em>lengh</em> da classe <em>Object</em>.

<code>&nbsp;&nbsp;&nbsp;&nbsp;let tHoraJSON = Object.keys(frasesCmd.hora).length;
&nbsp;&nbsp;&nbsp;&nbsp;let tDataJSON = Object.keys(frasesCmd.data).length;
&nbsp;&nbsp;&nbsp;&nbsp;let tHelpJSON = Object.keys(frasesCmd.help).length;
&nbsp;&nbsp;&nbsp;&nbsp;let tFraseJSON = Object.keys(frasesDoDia).length;
</code>

- Verifica o conteúdo digitado do usuário e replica com comando <em>message.reply</em> a mensagem de volta para o usuário no canal.

<code>&nbsp;&nbsp;&nbsp;&nbsp;if (message.content === `${config.messagem.prefix}help`) message.reply(`\n${frasesCmd.help[Math.round(Math.random() * (tHelpJSON - 1) + 1)]}`);<br>
&nbsp;&nbsp;&nbsp;&nbsp;if (message.content === `${config.messagem.prefix}data`) message.reply(`\n${frasesCmd.data[Math.round(Math.random() * (tDataJSON - 1) + 1)]} **${pegaTempo()[0]}**. Aproveitem!`);<br>
&nbsp;&nbsp;&nbsp;&nbsp;if (message.content === `${config.messagem.prefix}hora`) message.reply(`\n${frasesCmd.hora[Math.round(Math.random() * (tHoraJSON - 1) + 1)]} **${pegaTempo()[1]}** hora(s).`);<br>
&nbsp;&nbsp;&nbsp;&nbsp;if (message.content === `${config.messagem.prefix}comandos`) message.reply(`\n${frasesCmd.comandos}`);<br>
&nbsp;&nbsp;&nbsp;&nbsp;if (message.content === `${config.messagem.prefix}frase`) message.reply(`\n*${frasesDoDia[Math.round(Math.random() * (tFraseJSON - 1) + 1)]}*`);<br>
&nbsp;&nbsp;&nbsp;&nbsp;if (message.content === `${config.messagem.prefix}salve`) message.reply(msgEmbed);</code>