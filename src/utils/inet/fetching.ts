export async function fetching(url: string, ua: string = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"){
    const f = await fetch(url, {
        headers: {
            "User-Agent": ua
        }
    })
    const html = await f.text()

    return html
}