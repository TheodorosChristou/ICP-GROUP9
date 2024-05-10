FROM node:22 as base
ENV NODE_OPTIONS=--max_old_space_size=1700

WORKDIR /usr/build

COPY package.json ./

RUN npm install

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build
