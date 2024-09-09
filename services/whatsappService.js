// whatsappService.js
const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcodeTerminal = require('qrcode-terminal');
const qrcode = require('qrcode');

let qrCodeData = ''; // Variable global para almacenar el QR

const client = new Client({
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', async (qr) => {
    console.log('QR RECEIVED', qr);
    qrcodeTerminal.generate(qr, { small: true });
    qrCodeData = await qrcode.toDataURL(qr); // Almacena el QR en base64
});

client.on('ready', () => {
    console.log('Cliente de WhatsApp listo');
});

client.on('authenticated', () => {
    console.log('Cliente autenticado');
});

client.on('auth_failure', (message) => {
    console.error('Error de autenticación', message);
});

client.initialize();

const sendMediaToGroup = async (groupName, imagePath, text) => {
    if (!client.pupPage) {
        throw new Error('Cliente de WhatsApp no está listo');
    }

    const chats = await client.getChats();
    const group = chats.find(chat => chat.name === groupName);

    if (!group) {
        throw new Error('Grupo no encontrado');
    }

    const media = MessageMedia.fromFilePath(imagePath);
    await client.sendMessage(group.id._serialized, media, { caption: text });
};

module.exports = {
    client,
    sendMediaToGroup,
    getQRCodeData: () => qrCodeData // Exporta una función para obtener el QR
};
