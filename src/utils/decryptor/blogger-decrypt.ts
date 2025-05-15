import { fetching } from "../inet/fetching";
import { decryptorRegistry } from "./decryptor-registry";
import { Decryptor, Source, SourceItem } from "./types";

export class BloggerDecryptor implements Decryptor {
    async processing(url: string, ua: string): Promise<Source> {
        const html = await fetching(url, ua)
        const match = html.match(/var VIDEO_CONFIG = (\{.*[,]?\})/);
        const source: Source = {
            type: "",
            title: "",
            sources: [],
            tracks: [],
            poster: ""
        }

        if (!match) {
            return source
        }

        const jsonString = match[1];
        const jsonData = JSON.parse(jsonString);
        const formatId = {
            "18": {
                type: "video/mp4",
                size: 360
            },
            "22": {
                type: "video/mp4",
                size: 720
            }
        }
        
        for(let i = 0; i < jsonData.streams.length; i++){
            if(!(jsonData.streams[i].format_id in formatId)){
                console.log("Trigger")
                continue
            }

            type FID = "18" | "22"
            const fid = (jsonData.streams[i].format_id as number).toString()
            const fidItem = formatId[fid as FID]
            const sourceItem: SourceItem = {
                src: jsonData.streams[i].play_url,
                ...fidItem
            }
            source.sources.push(sourceItem)
        }

        source.type = "video"
        source.poster = jsonData.thumbnail

        return source
    }
}

decryptorRegistry.register("blogger.com", new BloggerDecryptor())