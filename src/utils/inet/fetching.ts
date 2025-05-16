import { SocksProxyAgent } from "socks-proxy-agent"
import fetch from 'node-fetch';

export async function fetching(
    url: string, 
    ua: string = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
    headers?: object,
){
    const agent = process.env.socks ? new SocksProxyAgent(process.env.socks) : undefined;

    const f = await fetch(url, {
        headers: {
            "User-Agent": ua,
            ...headers
        },
        agent
    })
    const html = await f.text()

    return html
}