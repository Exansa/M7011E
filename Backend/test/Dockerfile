FROM node:19-alpine

WORKDIR /usr/src/app/common
COPY common/package*.json .
RUN npm ci --only=production
COPY common/. .

WORKDIR /usr/src/app/test
COPY test/package*.json .
RUN npm ci --only=production
COPY test/. .

RUN npm run build

EXPOSE 8080
ENV PORT 8080
ENV NODE_ENV production
CMD ["npm", "start"]
