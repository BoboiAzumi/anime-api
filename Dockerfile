FROM oven/bun:latest

WORKDIR /app

COPY package.json .
COPY bun.lock .
COPY . .

RUN bun install

EXPOSE 3000

CMD ["bun", "run", "start"]