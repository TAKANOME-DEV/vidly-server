FROM node:16.14-alpine3.15

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

USER node

# https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

ENV PATH=$PATH:/home/node/.npm-global/bin

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod

COPY ./dist README.md ./dist/

EXPOSE 3001

CMD ["pnpm", "start"]