FROM node:10

RUN mkdir /api
WORKDIR /api

COPY ./app .

RUN yarn install --no-cache --ignore-optional --frozen-lockfile --network-timeout 100000

ENTRYPOINT ["yarn"]
