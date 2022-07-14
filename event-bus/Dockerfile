##setup base image
FROM node:alpine

##set container working directory
WORKDIR /usr/app

## copy pakage.json to prevent unnecassary rebuilds
COPY ./package.json ./

## install all needed dependencies
RUN yarn install

## copy other files from your directory to container directory
COPY ./ ./

CMD ["yarn", "start"]