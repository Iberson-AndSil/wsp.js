# Usa una imagen oficial de Node.js como imagen base
FROM node:18

# Instala las dependencias necesarias para Puppeteer
RUN apt-get update && apt-get install -y \
    chromium \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto, incluyendo Puppeteer
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto que la aplicación utiliza (opcional)
EXPOSE 3000

# Establece la ruta del navegador Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]
