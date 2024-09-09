const express = require('express');
const cors = require('cors');
const qrRoutes = require('./routes/qrRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use(qrRoutes);
app.use(scheduleRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
}); 