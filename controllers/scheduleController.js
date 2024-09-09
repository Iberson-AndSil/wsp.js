// scheduleController.js
const { getQRCodeData, sendMediaToGroup } = require('../services/whatsappService');
const schedule = require('node-schedule');
const fs = require('fs');

const getQRCode = (req, res) => {
    const qrCodeData = getQRCodeData(); // Obtén el QR del servicio
    if (qrCodeData) {
        res.send({ qr: qrCodeData });
    } else {
        res.status(404).send('QR code not available');
    }
};

const scheduleMessages = (req, res) => {
    const { texts, times } = req.body;
    const images = req.files;

    times.forEach((time, index) => {
        const date = new Date(time);
        const text = texts[index];
        const imagePath = images[index].path;

        schedule.scheduleJob(date, async () => {
            try {
                await sendMediaToGroup('Jhosep', imagePath, text);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error al eliminar la imagen:', err);
                    } else {
                        console.log('Imagen eliminada exitosamente:', imagePath);
                    }
                });
            } catch (error) {
                console.error('Error al enviar mensaje o imagen:', error);
            }
        });
    });

    res.send('Mensajes programados exitosamente');
};

module.exports = {
    getQRCode,
    scheduleMessages,
};
