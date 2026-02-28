import index from "./index.html";

const server = Bun.serve({
  routes: {
    "/*": index,
  },
  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`🎲 Spielmechanik-Generator läuft auf ${server.url}`);
