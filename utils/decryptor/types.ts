export interface Decryptor{
    processing(url: string, ua: string): Promise<Source>
}

export type SourceItem = {
    src: string,
    type: string,
    size: number
}

export type Track = {
    kind: string,
    label: string,
    srclang: string,
    src: string,
    default?: boolean
}

export type Source = {
    type: "video" | "audio" | "",
    title?: string,
    sources: SourceItem[],
    tracks?: Track[],
    poster?: string
}