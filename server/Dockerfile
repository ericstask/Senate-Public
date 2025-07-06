FROM node:18

WORKDIR /home/app

# Install nodemon
RUN npm install --save-dev nodemon

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npx", "nodemon", "server.js"]
