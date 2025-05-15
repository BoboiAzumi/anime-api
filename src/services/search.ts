import { Context } from "hono";
import { registry } from "../pipeline";

export async function search(c: Context){
    try{
        const plugin = c.req.param("plugin")
        const page = parseInt(c.req.param("page"))
        const { q } = c.req.query()
        return c.json(await registry.getPlugin(plugin)?.search(q ? q : "", page) as any)
    }
    catch {
        return c.json({
            status: "error"
        })
    }
}