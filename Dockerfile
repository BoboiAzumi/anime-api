FROM oven/bun:latest

WORKDIR /app

COPY bun.lock ./
COPY package.json ./

RUN bun install

COPY tsconfig.json ./
COPY .env ./
COPY src ./src

EXPOSE 3000

CMD ["bun", "run", "start"]