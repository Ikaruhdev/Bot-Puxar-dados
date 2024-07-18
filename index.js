
/***************************************************************************/
/*                                                                         */
/*                           Made by og.Ikaruh                             */
/*                      Best Source FOR Discord Bot                        */
/*               Server Support : https://discord.gg/nWEKmqNgcS            */
/*                        My instagram : prazericaro                       */
/*                              Copyright: 2021                            */
/*  .:'                                  `:.                               */
/* ::'                                    `::                              */
/*:: :.                                  .: ::                             */
/* `:. `:.             .             .:'  .:'                              */
/*   `::. `::          !           ::' .::'                                */
/*      `::.`::.    .' ! `.    .::'.::'                                    */
/*        `:.  `::::'':!:``::::'   ::'                                     */
/*        :'*:::.  .:' ! `:.  .:::*`:                                      */
/*       :: HHH::.   ` ! '   .::HHH ::                                     */
/*      ::: `H TH::.  `!'  .::HT H' :::                                    */
/*      ::..  `THHH:`:   :':HHHT'  ..::                                    */
/*      `::      `T: `. .' :T'      ::'                                    */
/*        `:. .   :         :   . .:'                                      */
/*          `::'               `::'                                        */
/*            :'  .`.  .  .'.  `:                                          */
/*            :' ::.       .:: `:                                          */
/*            :' `:::     :::' `:                                          */
/*             `.  ``     ''  .'                                           */
/*              :`...........':                                            */
/*              ` :`.     .': '                                            */
/*               `:  `"""'  :'                                             */
/***************************************************************************/
const { execSync } = require('child_process');
const { Client, GatewayIntentBits, ActivityType, EmbedBuilder } = require('discord.js');
const moment = require('moment');
const readline = require('readline');
const config = require('./config.json');
const colors = require('colors');
const RPC = require('discord-rpc');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

let richPresenceEnabled = config.richPresenceEnabled || false;

// Função para instalar módulos necessários
const checkAndInstallModules = () => {
    const requiredModules = ['discord.js', 'moment', 'readline', 'colors', 'discord-rpc', 'axios'];
    const missingModules = requiredModules.filter(module => {
        try {
            require.resolve(module);
            return false;
        } catch (e) {
            return true;
        }
    });

    if (missingModules.length > 0) {
        console.log('Os seguintes módulos estão faltando e serão instalados:'.red);
        console.log(missingModules.join(', ').yellow);
        try {
            execSync(`npm install ${missingModules.join(' ')}`, { stdio: 'inherit' });
            console.log('Módulos instalados com sucesso.'.green);
        } catch (error) {
            console.error('Erro ao instalar módulos:', error);
            process.exit(1);
        }
    } else {
        console.log('Todos os módulos necessários estão instalados.'.green);
    }
};

// Animação simples de carregamento em porcentagem
const showLoadingAnimation = async (message, duration) => {
    const steps = duration / 50;
    for (let i = 0; i <= 100; i += 2) {
        process.stdout.write(`\r${message} ${i}%`);
        await new Promise(resolve => setTimeout(resolve, steps));
    }
    process.stdout.write('\n');
};

// Instalação de módulos
checkAndInstallModules();

// Crie uma nova instância de Client com os intents necessários
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// Configuração do RPC
const rpc = new RPC.Client({ transport: 'ipc' });

// Função para iniciar o RPC
const startRPC = async () => {
    try {
        await rpc.login({ clientId: config.rpcClientId });
    } catch (error) {
        console.error('Erro ao iniciar o RPC:', error);
    }
};

// Função para atualizar a Rich Presence
const updateRichPresence = (details, state) => {
    if (richPresenceEnabled) {
        rpc.setActivity({
            details: details,
            state: state,
            largeImageKey: "icon",
            largeImageText: "/neurasthenia",
            smallImageKey: "icon2",
            smallImageText: "Ikaruh Scripts",
            instance: false,
        });
    }
};

// Função para redefinir a Rich Presence ao estado inicial
const resetRichPresence = () => {
    if (richPresenceEnabled) {
        updateRichPresence("No menu Principal", "Aguardando Sistema de Hacking...");
    }
};

// Função para exibir o menu principal
const showMainMenu = () => {
    console.clear();
    console.log(`
        †                    †                †                                  †
          †           †               †            †               †
██╗███╗   ██╗████████╗███████╗██╗     ██╗ ██████╗ ███████╗███╗   ██╗ ██████╗██╗ █████╗ 
██║████╗  ██║╚══██╔══╝██╔════╝██║     ██║██╔════╝ ██╔════╝████╗  ██║██╔════╝██║██╔══██╗
██║██╔██╗ ██║   ██║   █████╗  ██║     ██║██║  ███╗█████╗  ██╔██╗ ██║██║     ██║███████║
██║██║╚██╗██║   ██║   ██╔══╝  ██║     ██║██║   ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══██║
██║██║ ╚████║   ██║   ███████╗███████╗██║╚██████╔╝███████╗██║ ╚████║╚██████╗██║██║  ██║
╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚══════╝╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚═╝  ╚═╝        
             Copyright Inteligência da Segurança Digital 2024   
             
             
    `.white);

    console.log('Seja bem vindo, ao inferno.\n'.blue);
    console.log('[ 1 ] Executar Bot');
    console.log('[ 2 ] Ver Token');
    console.log('[ 3 ] Bot Info');
    console.log('[ 4 ] Ativar/Desativar Rich Presence');
    console.log('Digite uma opção:');
};

startRPC();

client.login(config.token).then(async () => {
    await showLoadingAnimation('Iniciando bot', 2500);
    showMainMenu();
}).catch(console.error);

moment.locale('pt-br');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', async (input) => {
    console.clear();
    switch (input.trim()) {
        case '1':
            await showLoadingAnimation('Carregando', 1500);
            startBot();
            break;
        case '2':
            showToken();
            console.log('\nVoltando à tela inicial em 5 segundos...');
            setTimeout(showMainMenu, 5000);
            break;
        case '3':
            showBotInfo();
            console.log('\nVoltando à tela inicial em 5 segundos...');
            setTimeout(showMainMenu, 5000);
            break;
        case '4':
            toggleRichPresence();
            console.log('\nVoltando à tela inicial em 5 segundos...');
            setTimeout(showMainMenu, 5000);
            break;
        default:
            console.log('Opção inválida, tente novamente.'.yellow);
            showMainMenu();
            break;
    }
});

const startBot = () => {
    console.log(`
        †                    †                †                                  †
          †           †               †            †               †
██╗███╗   ██╗████████╗███████╗██╗     ██╗ ██████╗ ███████╗███╗   ██╗ ██████╗██╗ █████╗ 
██║████╗  ██║╚══██╔══╝██╔════╝██║     ██║██╔════╝ ██╔════╝████╗  ██║██╔════╝██║██╔══██╗
██║██╔██╗ ██║   ██║   █████╗  ██║     ██║██║  ███╗█████╗  ██╔██╗ ██║██║     ██║███████║
██║██║╚██╗██║   ██║   ██╔══╝  ██║     ██║██║   ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══██║
██║██║ ╚████║   ██║   ███████╗███████╗██║╚██████╔╝███████╗██║ ╚████║╚██████╗██║██║  ██║
╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚══════╝╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚═╝  ╚═╝        
             Copyright Inteligência da Segurança Digital 2024   
             
             
    `.white);
    console.log('[ ✓ ]Bot iniciado com sucesso.'.blue);
    client.user.setActivity(`${config.status}`, { type: ActivityType.Streaming, url: '!ajuda' });
    resetRichPresence();
    rl.pause();  // Pausa o readline para não aceitar mais comandos enquanto o bot está ativo
};

const showToken = () => {
    console.log(`
        †                    †                †                                  †
          †           †               †            †               †
██╗███╗   ██╗████████╗███████╗██╗     ██╗ ██████╗ ███████╗███╗   ██╗ ██████╗██╗ █████╗ 
██║████╗  ██║╚══██╔══╝██╔════╝██║     ██║██╔════╝ ██╔════╝████╗  ██║██╔════╝██║██╔══██╗
██║██╔██╗ ██║   ██║   █████╗  ██║     ██║██║  ███╗█████╗  ██╔██╗ ██║██║     ██║███████║
██║██║╚██╗██║   ██║   ██╔══╝  ██║     ██║██║   ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══██║
██║██║ ╚████║   ██║   ███████╗███████╗██║╚██████╔╝███████╗██║ ╚████║╚██████╗██║██║  ██║
╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚══════╝╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚═╝  ╚═╝        
             Copyright Inteligência da Segurança Digital 2024   
             
             
    `.white);
    console.log(`Token: ${config.token}`.yellow);
};

const showBotInfo = () => {
    console.log(`
        †                    †                †                                  †
          †           †               †            †               †
██╗███╗   ██╗████████╗███████╗██╗     ██╗ ██████╗ ███████╗███╗   ██╗ ██████╗██╗ █████╗ 
██║████╗  ██║╚══██╔══╝██╔════╝██║     ██║██╔════╝ ██╔════╝████╗  ██║██╔════╝██║██╔══██╗
██║██╔██╗ ██║   ██║   █████╗  ██║     ██║██║  ███╗█████╗  ██╔██╗ ██║██║     ██║███████║
██║██║╚██╗██║   ██║   ██╔══╝  ██║     ██║██║   ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══██║
██║██║ ╚████║   ██║   ███████╗███████╗██║╚██████╔╝███████╗██║ ╚████║╚██████╗██║██║  ██║
╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚══════╝╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚═╝  ╚═╝        
             Copyright Inteligência da Segurança Digital 2024   
             
             
    `.white);
    console.log(`
        Informações do Bot:
        Nome: ${client.user?.username || 'Bot'}
        ID: ${client.user?.id || 'Desconhecido'}
        Prefixo: ${config.prefix}
        Descrição: Um bot feito por um adolescente que tem tédio do mundo.
    `.blue);
};

const toggleRichPresence = () => {
    richPresenceEnabled = !richPresenceEnabled;
    config.richPresenceEnabled = richPresenceEnabled;
    fs.writeFileSync('./config.json', JSON.stringify(config, null, 4));

    console.log(richPresenceEnabled ? 'Rich Presence ativado.' : 'Rich Presence desativado.');
};

// Carrega todos os comandos da pasta commands
client.on('messageCreate', async message => {
    if (message.author.bot || message.channel.type === 'DM') {
        return;
    }

    if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) {
        return;
    }

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const commandFile = `./commands/${commandName}.js`;

    if (fs.existsSync(commandFile)) {
        if (message.channel.id !== '1260194601000763433') {
            const embed = new EmbedBuilder()
                .setTitle('Canal Incorreto')
                .setDescription('Por favor, use os comandos no canal <#1260194601000763433>.')
                .setColor('#FF0000');
            return message.channel.send({ embeds: [embed] });
        }

        const command = require(commandFile);
        try {
            await command.run(client, message, args, updateRichPresence, resetRichPresence);
            console.log(`[ ✓ ] Comando executado: ${commandName}`.green);
        } catch (error) {
            console.error('Erro ao executar comando:', error);
        }
    }
});

client.on('ready', () => {
    const channel = client.channels.cache.get('1158565023111725117');
    if (channel) {
        // Ações adicionais ao usar o canal
    }
});

process.on('unhandledRejection', (reason, p) => {
    console.log('❌  | Um erro não tratado foi detectado');
    console.log(reason, p);
});

process.on('uncaughtException', (err, origin) => {
    console.log('❌  | Um erro não tratado foi detectado');
    console.log(err, origin);
});
