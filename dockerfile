FROM node:23.10-alpine3.20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install \
    npm i -g @nestjs/cli@5.0.1


COPY . .

EXPOSE 3000

# CMD ["npm", "run", "start:dev"]