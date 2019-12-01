FROM node:12

RUN mkdir /api
WORKDIR /api

COPY ./app/package.json ./
COPY ./app/yarn.lock ./

RUN yarn install --no-cache --ignore-optional --frozen-lockfile --network-timeout 100000

COPY ./app .

EXPOSE 1488
EXPOSE 9229

ENTRYPOINT ["yarn"]
