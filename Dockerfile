FROM node:20-alpine3.19

ENV NODE_ENV production

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY node_modules node_modules
COPY dist dist

USER node

EXPOSE 3000
HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1  

CMD  ["npm", "run", "serve"]