FROM oven/bun:canary-debian

WORKDIR /app

COPY package.json ./package.json
COPY bun.lock ./bun.lock

#RUN bun install

COPY tsconfig.json ./tsconfig.json
COPY .env ./.env
COPY src ./src

EXPOSE 3000

CMD ["bun", "run", "start"]