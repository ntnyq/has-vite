import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      'has-vite': fileURLToPath(new URL('./src/index.ts', import.meta.url)),
    },
  },

  test: {
    coverage: {
      include: ['./src/**/*.ts'],
      reporter: ['lcov', 'text'],
    },
    reporters: ['dot'],
  },
})
