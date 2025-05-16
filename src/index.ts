console.log("STARTING")
export type { 
    RegisteredPlugin,
    AnimePlugin,
    PluginName,
    PluginSelection
} from "./pipeline/types"

import 'dotenv/config';

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
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  hostname: '0.0.0.0'
})

console.log("✅ Server ready at http://localhost:3000")