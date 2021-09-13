FROM node:14

WORKDIR /app

COPY package*.json ./
COPY .env ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]

EXPOSE 5000
