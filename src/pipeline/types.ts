export type AnimeListItem = {
    title: string,
    image: string,
    slug: string
}

export type EpisodeItem = {
    episode: string,
    slug: string
}

export type AnimeSeries = {
    title: string,
    alttitle?: string,
    status: string,
    genre: string,
    synopsis?: string,
    episodes: EpisodeItem[]
}

export type AnimeList = {
    data: AnimeListItem[],
    currentPage: number,
    hasNextPage: boolean
}

export interface AnimePlugin{
    search(q?: string, page?: number): Promise<AnimeList>,
    series(slug: string): Promise<AnimeSeries>,
    watch(slug: string, ua: string): Promise<any>
}

export interface RegisteredPlugin {
    
}

export type PluginName = keyof RegisteredPlugin;
export type PluginSelection<N extends PluginName> = RegisteredPlugin[N]