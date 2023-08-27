FROM node:18-alpine

WORKDIR /code
ADD package.json pnpm-lock.yaml /code/
RUN pnpm

ADD . /code
RUN pnpm build

EXPOSE 3000
CMD npm start

