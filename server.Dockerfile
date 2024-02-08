FROM node:18.15.0

WORKDIR /usr/src/app

COPY server/package*.json .

RUN npm install

COPY server/ .

ARG PORT=8090

ENV PORT=${PORT}

EXPOSE ${PORT}

CMD [ "npm","run","dev" ]

# docker build --build-arg PORT=8090 -t server-app:dev -f server.Dockerfile .
# docker run -e PORT=8090 -p 8090:8090 server-app:dev