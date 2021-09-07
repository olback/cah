FROM node:12-alpine

RUN mkdir /cah

COPY server/ /cah/server
COPY client/dist /cah/client/dist

WORKDIR /cah/server

CMD [ "/usr/local/bin/node", "out/server.js" ]
