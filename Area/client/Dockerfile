FROM node:16.14.0

WORKDIR /usr/app
COPY package.json .
RUN yarn install
COPY . .

EXPOSE 8081
CMD ["yarn", "start"]