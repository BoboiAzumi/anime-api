FROM oven/bun:canary-debian

WORKDIR /app

COPY . .

#RUN bun install

EXPOSE 3000

CMD ["bun", "run", "start"]