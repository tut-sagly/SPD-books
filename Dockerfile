FROM node:latest

WORKDIR /home/app

COPY package.json /home/app
RUN npm install

COPY . /home/app/

CMD [ "npm", "run", "start:dev" ]
