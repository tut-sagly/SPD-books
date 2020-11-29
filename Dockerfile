FROM node:latest

WORKDIR /home/app

ENV PORT 3000

COPY package.json /home/app
RUN npm install

COPY . /home/app/

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
