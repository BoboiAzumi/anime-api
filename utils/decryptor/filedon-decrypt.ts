import { fetching } from "../inet/fetching";
import { post } from "../inet/post";
import { decryptorRegistry } from "./decryptor-registry";
import { Decryptor, Source } from "./types";

export class FiledonDecryptor implements Decryptor {
    async processing(url: string, ua: string): Promise<Source> {
        const html = await fetching(url, ua)
        const source: Source = {
            type: "",
            title: "",
            sources: [],
            tracks: [],
            poster: ""
        }
        const regex = /'X-CSRF-TOKEN': '([^']+)'|slug: '([^']+)'/g;
        let match;
        let tokenString;
        let slugString;

        while ((match = regex.exec(html)) !== null) {
            const token = match[1];
            const slug = match[2];
        
            if (token) tokenString = token
            if (slug) slugString = slug
        }

        const jsonFile = await post(
            "https://filedon.co/get-url", 
            ua, 
            { "X-CSRF-TOKEN": tokenString, "Content-Type": "application/json" }, 
            { slug: slugString }
        )
        const json = JSON.parse(jsonFile)

        source.type = "video"
        source.sources.push({
            src: json.data.url,
            type: "video/mp4",
            size: 720
        })

        return source
    }
}

decryptorRegistry.register("filedon.co", new FiledonDecryptor())