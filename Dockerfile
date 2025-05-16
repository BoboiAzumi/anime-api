FROM oven/bun:1.2.7

WORKDIR /app

COPY package.json ./
COPY bun.lock ./

RUN apt update -y && apt upgrade -y
RUN apt install net-tools
RUN bun install

COPY . .

EXPOSE 3000

#CMD ["bun", "run", "src/index.ts"]
CMD ["sh", "-c", "ping 8.8.8.8"]