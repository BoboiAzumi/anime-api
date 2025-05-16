FROM oven/bun:1.2.7-alpine

WORKDIR /app

COPY package.json ./

RUN bun install

COPY . .

EXPOSE 8000

CMD ["bun", "run", "start"]