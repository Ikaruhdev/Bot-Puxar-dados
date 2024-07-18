# SP-NI Discord Bot

Este repositório contém um bot do Discord que utiliza a API do SP-NI para obter dados de uma pessoa usando o CPF.

![Bot Banner](https://media.discordapp.net/attachments/1260233668018835619/1263462176811913309/b9c3c83256e34107e1f4a2ce98f4b2ae-removebg-preview.png?ex=669a5258&is=669900d8&hm=60a45b61184c932d3e2e60e7d176b86eba270413ef54529aad4c420a357ca4b0&=&format=webp&quality=lossless&width=393&height=353)

[![Node.js](https://img.shields.io/badge/node.js-14.17.3-green)](https://nodejs.org/)
[![Discord.js](https://img.shields.io/badge/discord.js-14.0.0-blue)](https://discord.js.org/)

## Índice

1. [Descrição](#descrição)
2. [Pré-requisitos](#pré-requisitos)
3. [Configuração](#configuração)

## Descrição

Este bot do Discord utiliza a API do SP-NI para puxar dados de uma pessoa pelo CPF. É uma ferramenta útil para obter informações detalhadas de forma rápida e prática.

## Pré-requisitos

- Node.js instalado
- Conta no Discord
- Servidor no Discord onde você tenha permissões de administrador
- Token da API do SP-NI

## Configuração

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/sp-ni-discord-bot.git
   cd sp-ni-discord-bot
Instale as dependências:

bash
Copiar código
npm install
Crie um arquivo .env com as seguintes variáveis de ambiente:

makefile
Copiar código
TOKEN=seu-token-do-discord
SP_NI_API_KEY=sua-chave-da-api-sp-ni
Código do Bot
Aqui está um exemplo básico do código do bot (bot.js):

javascript
Copiar código
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const cpfCommand = require('./cpf');

client.once('ready', () => {
    console.log('Bot está online!');
});

client.on('messageCreate', message => {
    if (message.content.startsWith('!cpf')) {
        const cpf = message.content.split(' ')[1];
        cpfCommand(cpf, message);
    }
});

client.login(process.env.TOKEN);
Como Rodar o Bot
Você pode inicializar o bot de duas maneiras:

Método 1: Iniciando diretamente pelo Node.js
Use o comando abaixo para iniciar o bot:

bash
Copiar código
node bot.js
Método 2: Criando um arquivo .bat (Windows)
Crie um arquivo chamado start.bat.

Adicione o seguinte conteúdo ao arquivo:

batch
Copiar código
@echo off
node bot.js
Salve o arquivo e dê um duplo clique nele para iniciar o bot.

Comando cpf.js
Aqui está um exemplo básico do código do comando cpf.js que utiliza a API do SP-NI:

javascript
Copiar código
const fetch = require('node-fetch');

module.exports = async (cpf, message) => {
    const response = await fetch(`https://api.sp-ni.com/v1/cpf/${cpf}`, {
        headers: {
            'Authorization': `Bearer ${process.env.SP_NI_API_KEY}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        message.channel.send(`Nome: ${data.name}, Idade: ${data.age}`);
    } else {
        message.channel.send('Não foi possível encontrar os dados para o CPF fornecido.');
    }
};
Recursos Adicionais
Para mais informações, consulte os seguintes recursos:

Documentação do Discord.js
Portal de Desenvolvedores do Discord
Documentação da API do SP-NI
Contribuições
Contribuições são bem-vindas! Por favor, abra um issue ou envie um pull request.

Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

markdown
Copiar código

### Explicações Adicionais

- **Descrição:** Uma breve descrição sobre o que o bot faz.
- **Pré-requisitos:** Lista de itens necessários para configurar e rodar o bot.
- **Configuração:** Instruções detalhadas sobre como configurar o ambiente e as variáveis de ambiente necessárias.
- **Código do Bot:** Exemplo do arquivo principal `bot.js` que inicializa o bot e define seu comportamento.
- **Como Rodar o Bot:** Instruções sobre como iniciar o bot, incluindo métodos alternativos para sistemas Windows.
- **Comando `cpf.js`:** Exemplo do arquivo de comando `cpf.js` que faz a chamada à API do SP-NI.
- **Recursos Adicionais:** Links úteis para documentações relevantes.
- **Contribuições:** Informações sobre como contribuir para o projeto.
- **Licença:** Tipo de licença do projeto.
