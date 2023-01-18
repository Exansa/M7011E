# M7011E Backend

## Quick Deploy Locally

1. Make sure you have installed Docker and Docker Compose(both will be installed by installing "docker desktop")
2. Navigate to Backend folder in a terminal
3. `$ docker compose up -d --build --no-deps`
4. You can now make HTTP requests to the API Service using http://localhost:5001

## Prerequisities

### Docker

Install Docker Desktop from the [website](https://www.docker.com).

### Node.js

To be able to run, develop, and test individual services depending on Node.js you "need" to have Node.js installed on your local machne. Node Version Manager ([nvm](https://www.linode.com/docs/guides/how-to-install-use-node-version-manager-nvm/)) is recommended, but not required. You can also install a single version from the default [website](https://nodejs.org/en/) but be aware of different versions.

## Services

The easiest way to create a new service is to run the [createservice](createservice.sh)
script. Send the name of the service as a parameter.

```console
$ ./createservice.sh <SERVICE_NAME>
```

This will create a Node.js server with the Express.js framework, supporting TypeScript and also installing some housekeeping plugins for eslint and prettier.
This also creates a Dockerfile for convenient dockerization of the service.

**You don't have to use this script**, or Node.js at all for that matter. This is to be seen simillar to Netflix [Paved Road](https://www.oreilly.com/library/view/oscon-2017/9781491976227/video306724.html).

### Docker

All services must be deployable using a Dockerfile.

#### Docker Compose

To orchestrate and administrate the entire backend [Docker Compose](https://docs.docker.com/get-started/08_using_compose/) is used. Configuration is set up using [docker-compose.yml](docker-compose.yml).

### Communication between Services

One of the deployed services is a [RabbitMQ](https://www.rabbitmq.com) broker. This service listens for messages that are sent to _`queues`_ and deploys those messages to services that listens to the particular queue.

If no service is actively listening, the messages is requeued for later deployment, unless other specified.
