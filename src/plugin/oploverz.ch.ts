import { JSDOM } from "jsdom"
import { AnimePlugin, registry } from "../pipeline";
import { AnimeList, AnimeListItem, AnimeSeries, EpisodeItem } from "../pipeline/types";
import { fetching } from "../utils/inet/fetching";
import { decryptor } from "../utils/decryptor/";

declare module "../index" {
    interface RegisteredPlugin {
        "oploverz.ch": OploverzCH
    }
}

class OploverzCH implements AnimePlugin {
    private url: string = "https://oploverz.ch"

    async search(q: string = "", page: number = 1): Promise<AnimeList> {
        const html = await fetching(`${this.url}/page/${page}/?s=${q}`)
        const DOM: JSDOM = new JSDOM(html)
        if(DOM.window.document.getElementsByClassName("listupd").length == 0){
            return {
                data: [],
                currentPage: page,
                hasNextPage: false
            }
        }
        const listupd: Element = DOM.window.document.getElementsByClassName("listupd")[0]
        const bsx: HTMLCollectionOf<Element> = listupd.getElementsByClassName("bsx")

        const list: AnimeListItem[] = []

        for(let i = 0; i < bsx.length; i++){
            const item: AnimeListItem = {
                title: bsx[i].getElementsByTagName("h2")[0].innerHTML,
                image: bsx[i].getElementsByClassName("ts-post-image")[0].getAttribute("src") as string,
                slug:  bsx[i].getElementsByClassName("tip")[0].getAttribute("href")?.replace("https://oploverz.ch/series/", "").replace("/", "") as string
            }

            list.push(item)
        }

        const animeList: AnimeList = {
            data: list,
            currentPage: page,
            hasNextPage: DOM.window.document.getElementsByClassName("next").length > 0
        }

        return animeList
    }

    async series(slug: string){
        const html = await fetching(`${this.url}/series/${slug}/`)
        const DOM: JSDOM = new JSDOM(html)
        const animefull: Element | null = DOM.window.document.getElementsByClassName("animefull")[0]

        const item: HTMLCollectionOf<Element> = animefull
                    .getElementsByClassName("spe")[0]
                    .getElementsByTagName("span")
        const genxed: HTMLCollectionOf<Element> = animefull
                    .getElementsByClassName("genxed")[0]
                    .getElementsByTagName("a")
        const episodeList: HTMLCollectionOf<Element> = DOM.window.document.getElementsByClassName("eplister")[0]
                    .getElementsByTagName("ul")[0]
                    .getElementsByTagName("li")

        const mapping = new Map<string, string>()
        const genres: string[] = []
        const episodes: EpisodeItem[] = []

        for(let i = 0; i < item.length; i++){
            const keyVal = item[i].textContent?.split(":")
            mapping.set((keyVal as string[])[0].trim(), (keyVal as string[])[1].trim())
        }

        for(let i = 0; i < genxed.length; i++){
            genres.push(genxed[i].textContent as string)
        }

        for(let i = 0; i < episodeList.length; i++){
            episodes.push({
                episode: episodeList[i].getElementsByClassName("epl-title")[0].textContent as string,
                slug: episodeList[i].getElementsByTagName("a")[0].getAttribute("href")?.replace(`${this.url}/`, "").replace("/", "") as string
            })
        }

        const series: AnimeSeries = {
            title: animefull?.getElementsByClassName("entry-title")[0].innerHTML,
            status: mapping.get("Status") as string,
            genre: genres.join(", "),
            synopsis: DOM.window.document.getElementsByClassName("entry-content")[0].textContent as string,
            episodes
        }

        return series
    }

    async watch(slug: string, ua: string){
        const html = await fetching(`${this.url}/${slug}/`)
        const DOM: JSDOM = new JSDOM(html)
        const iframe = DOM.window.document.getElementsByTagName("iframe")[0].getAttribute("src")
        return decryptor(iframe as string, ua)
    }
}

const oploverzch = new OploverzCH()

registry.register("oploverz.ch", oploverzch)