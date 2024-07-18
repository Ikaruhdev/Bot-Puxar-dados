const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports.run = async (client, message, args) => {
    const cpf = args[0].replace(/[./-\s]/g, '');
    
    const email = 'marciahev@gmail.com';
    const password = 'marciacosta1';
    const login = Buffer.from(`${email}:${password}`).toString('base64');
    
    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://si-pni.saude.gov.br/',
        'X-Authorization': `Basic ${login}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.76',
    };
    
    const request1 = await axios.post(
        'https://servicos-cloud.saude.gov.br/pni-bff/v1/autenticacao/tokenAcesso',
        {},
        { headers }
    );
    
    const accessToken = request1.data.accessToken;
    
    const headers3 = {
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://si-pni.saude.gov.br/',
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.76',
    };
    
    const response2 = await axios.get(
        `https://servicos-cloud.saude.gov.br/pni-bff/v1/cidadao/cpf/${cpf}`,
        { headers: headers3 }
    );
    
    const data = response2.data.records ? response2.data.records[0] : null;

    // Verifique se data está definido antes de prosseguir
    if (!data) {
        message.channel.send('Nenhuma informação encontrada para o CPF fornecido.');
        return;
    }
    
    const telefones = data.telefone || [];
    let ddd = '';
    let numero = '';
    
    // Verifique se data.telefone é um array antes de tentar iterar
    if (Array.isArray(telefones)) {
        telefones.forEach((telefone) => {
            ddd = telefone.ddd || '';
            numero = telefone.numero || '';
        });
    }
    
    const nome = data.nome || 'Sem Informação';
    const cns = data.cnsDefinitivo || 'Sem Informação';
    const datanasc = data.dataNascimento || 'Sem Informação';
    const sexo = data.sexo === 'F' ? 'Feminino' : 'Masculino';
    const nomeMae = data.nomeMae || 'Sem Informação';
    const nomePai = data.nomePai || 'Sem Informação';
    const obito = data.obito ? 'Sim' : 'Não';
    const pais = data.ddi || 'Sem Informação';
    
    const endereco = data.endereco || {};
    const logradouro = endereco.logradouro || 'Sem Informação';
    const numerocasa = endereco.numero || 'Sem Informação';
    const bairro = endereco.bairro || 'Sem Informação';
    const estado = endereco.siglaUf || 'Sem Informação';
    const cep = endereco.cep || 'Sem Informação';
    
    const liveEmbed = new EmbedBuilder()
        .setColor('#000000') // Cor preta em formato hexadecimal válido
        .setTitle('🔍 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗗𝗘 𝗖𝗣𝗙 🔍')
        .setDescription(`
• CPF: ${cpf}
• CNS: ${cns}
• NOME: ${nome}
• NASCIMENTO: ${datanasc}
• MÃE: ${nomeMae}
• PAI: ${nomePai}
• ENDEREÇO:
${logradouro}, ${numerocasa} - ${bairro}, ${estado} - ${cep}
• TELEFONE
(${ddd}) ${numero} - DESCONHECIDA
• Ikaruh7`)
        .setFooter({ text: 'Ikaruh7' });
    
    message.channel.send({ embeds: [liveEmbed] }).then((msg) => {
        setTimeout(() => {
            msg.delete().catch(console.error);
            message.delete().catch(console.error); // Exclui a mensagem do usuário após um tempo
        }, 100000);
    });
};
