FROM mhart/alpine-node:latest

RUN apk update && \
  apk add --no-cache make gcc g++ python bash && \
  npm install --ignore-optional -g node-gyp && \
  npm install -g yarn && \
  mkdir app

COPY package.json /app/package.json
COPY build /app/build/
# COPY ssl /app/ssl/

WORKDIR /app
RUN yarn install --prod

# match config port
EXPOSE 3300
CMD ["node", "build/server.js"]