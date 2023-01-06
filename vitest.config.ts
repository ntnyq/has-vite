import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      reporter: [
        `lcov`,
        `html`,
        `json`,
        `clover`,
        `text`,
      ],
    },
  },

  resolve: {
    alias: {
      'has-vite': fileURLToPath(new URL(`./src/index.ts`, import.meta.url)),
    },
  },
})
