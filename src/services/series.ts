import { Context } from "hono";
import { registry } from "../pipeline";

export async function series(c: Context){
    try{
        const plugin = c.req.param("plugin")
        const slug = c.req.param("slug")
        return c.json(await registry.getPlugin(plugin)?.series(slug) as any)
    }
    catch {
        return c.json({
            status: "error"
        })
    }
}