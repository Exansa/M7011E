FROM node:19-alpine

WORKDIR /usr/src/app/common
COPY common/package*.json .
RUN npm i
COPY common/. .

WORKDIR /usr/src/app/api
COPY api/package*.json .
RUN npm i
COPY api/. .

RUN npm run build

EXPOSE 8080
ENV PORT 8080
ENV NODE_ENV production
CMD ["node", "./build/api/src/index.js"]