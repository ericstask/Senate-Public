FROM node:18

WORKDIR /home/app

# Install Angular CLI so ng is available
RUN npm install --save-dev @angular/cli

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4200

# Use ng serve with flags required inside docker
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]
