FROM node:alpine

WORKDIR /usr/src/app

RUN npm install -g @angular/cli

COPY ./app/package*.json ./

RUN npm install --verbose

CMD ["ng", "serve", "--host", "0.0.0.0"]
