FROM node:19-alpine

WORKDIR /usr/src/app/common
COPY common/package*.json .
RUN npm i
COPY common/. .

WORKDIR /usr/src/app/totp
COPY totp/package*.json .
RUN npm i
COPY totp/. .

RUN npm run build

EXPOSE 8080
ENV PORT 8080
ENV NODE_ENV production
CMD ["node", "./build/totp/src/index.js"]