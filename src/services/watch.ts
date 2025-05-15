import { Context } from "hono";
import { registry } from "../pipeline";

export async function watch(c: Context){
    try{
        const ua = c.req.header("User-Agent")
        const plugin = c.req.param("plugin")
        const slug = c.req.param("slug")
        return c.json(await registry.getPlugin(plugin)?.watch(slug, ua as string) as any)
    }
    catch (err: unknown){
        return c.json({
            status: "error",
            message: (err as Error).message
        })
    }
}