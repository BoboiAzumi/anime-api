import { SocksProxyAgent } from "socks-proxy-agent"
import fetch from 'node-fetch';

export async function post(
    url: string, 
    ua: string = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
    headers: object,
    body: object | string
){
    const bodyParser = (typeof body) === "object" ? JSON.stringify(body) : body
    const headersParser = {
        "User-Agent": ua,
        ...headers
    }

    const agent = process.env.SOCKS ? new SocksProxyAgent(process.env.SOCKS) : undefined;

    const f = await fetch(url, {
        method: "POST",
        headers: headersParser ,
        body: bodyParser,
        agent
    })
    const html = await f.text()

    return html
}