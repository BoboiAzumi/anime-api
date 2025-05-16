export type {
    Decryptor,
    SourceItem,
    Source,
    Track
} from "./types"
import { parse } from 'tldts';

export { decryptorRegistry } from "./decryptor-registry"

import "./blogger-decrypt"
import "./filedon-decrypt"
import "./gdplayer-decrypt"

import { decryptorRegistry, Source } from "./index";

export async function decryptor(url: string, ua: string): Promise<Source> {
    const result = parse(url);
    if(!decryptorRegistry.hasDecryptor(result.domain as string)){
        return {
            type: "",
            title: "",
            sources: [],
            tracks: [],
            poster: ""
        }
    }

    return await decryptorRegistry.getDecryptor(result.domain as string)?.processing(url, ua) as Source
}