import "dotenv/config"

export type { 
    RegisteredPlugin,
    AnimePlugin,
    PluginName,
    PluginSelection
} from "./pipeline/types"

import { Context, Hono } from 'hono'
import { search } from "./services/search"
import { series } from "./services/series"
import { watch } from "./services/watch"

const app = new Hono()

app.get('/:plugin/page/:page/', search)
app.get('/:plugin/series/:slug', series)
app.get("/:plugin/watch/:slug", watch)
app.get("*", (c: Context) => {
  return c.json({
    status: "NOT_FOUND"
  })
})

Bun.serve({
  fetch: app.fetch,
  port: process.env.PORT || 3000
});
console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);