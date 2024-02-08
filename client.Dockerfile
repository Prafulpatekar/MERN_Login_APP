FROM node:18-alpine

WORKDIR /app/client

COPY client/package*.json .

RUN npm install

COPY client/ .

ARG PORT=3001

ENV PORT=${PORT}

EXPOSE ${PORT}

CMD [ "npm","run","dev" ]


# Commands
# docker build --build-arg PORT=3001 -t client-app:dev -f client.Dockerfile .
# docker run -e PORT=3001 -p 3001:3001 client-app:dev