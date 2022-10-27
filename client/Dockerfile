##setup base image
FROM node:16-alpine

# add the following line to prevent 
# https://github.com/facebook/create-react-app/issues/8688 
#    and 
# https://github.com/facebook/create-react-app/issues/11779 error

ENV CI=true
# ENV WDS_SOCKET_PORT = 0

##set container working directory
WORKDIR /usr/app

## copy pakage.json to prevent unnecassary rebuilds
COPY ./package.json ./

## install all needed dependencies
RUN yarn install

## copy other files from your directory to container directory
COPY ./ ./

CMD ["yarn", "start"]
