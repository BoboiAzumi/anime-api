FROM oven/bun:latest

WORKDIR /app

COPY package.json .
COPY bun.lock .

RUN bun install

COPY . .

RUN bun install

EXPOSE 3000

CMD ["bun", "run", "start"]