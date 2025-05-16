FROM oven/bun:1.2.7

WORKDIR /app

COPY package.json ./
COPY bun.lock ./

RUN bun install

EXPOSE 3000

CMD ["bun", "run", "start"]