FROM node:19-alpine

WORKDIR /usr/src/app/common
COPY common/package*.json .
RUN npm i
COPY common/. .

WORKDIR /usr/src/app/user
COPY user/package*.json .
RUN npm i
COPY user/. .

RUN npm run build

EXPOSE 8080
ENV PORT 8080
ENV NODE_ENV production
CMD ["node", "./build/user/src/index.js"]
