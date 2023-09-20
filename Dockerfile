
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# 啟動應用程式
CMD [ "node", "main.js" ]