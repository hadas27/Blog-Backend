FROM node:20

COPY . /express-app

WORKDIR /express-app

RUN npm ci
RUN npm run build

CMD node dist/Index.js