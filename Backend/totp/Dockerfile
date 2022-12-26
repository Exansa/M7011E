FROM node:19-alpine

WORKDIR /usr/src/app/common
COPY common/package*.json .
RUN npm ci --only=production
COPY common/. .

WORKDIR /usr/src/app/totp
COPY totp/package*.json .
RUN npm ci --only=production
COPY totp/. .

RUN npm run build

EXPOSE 8080
ENV NODE_ENV production
CMD ["node", "./build/totp/src/index.js"]