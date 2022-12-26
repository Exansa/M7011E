FROM node:19-alpine

WORKDIR /usr/src/app/common
COPY common/package*.json .
RUN npm ci --only=production
COPY common/. .

WORKDIR /usr/src/app/authentication
COPY authentication/package*.json .
RUN npm ci --only=production
COPY authentication/. .

RUN npm run build

EXPOSE 8080
ENV NODE_ENV production
CMD ["node", "./build/authentication/src/index.js"]