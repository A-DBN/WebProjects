FROM node:16.9.1

WORKDIR /usr/app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .

ENV PORT 3000

EXPOSE 3000
CMD ["yarn", "start"]