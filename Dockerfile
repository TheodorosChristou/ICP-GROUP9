FROM node:17 as base 

WORKDIR /

COPY package.json ./

RUN npm install

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build