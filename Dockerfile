FROM node:16

WORKDIR /app

COPY --chown=app:app . .

COPY package*.json ./

RUN yarn install --force

COPY . .
