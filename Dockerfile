FROM node:14

WORKDIR /app

COPY package.json ./
COPY .dev.env ./

RUN npm install

COPY . .
