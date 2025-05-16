import { AnimePlugin, PluginName } from "./index";

export class Registry {
    private plugin: Map<string, AnimePlugin> = new Map()
    
    register<PName extends PluginName, Plug extends AnimePlugin>(
        pName: PName,
        plugin: Plug
    ): void {
        this.plugin.set(pName, plugin)
    }

    getPlugin(name: string): AnimePlugin | undefined {
        return this.plugin.get(name)
    }

    hasPlugin(name: string): boolean {
        return this.plugin.has(name)
    }

    getPluginNames(): PluginName[]{
        return Array.from(this.plugin.keys()) as PluginName[]
    }
}

export const registry: Registry = new Registry()