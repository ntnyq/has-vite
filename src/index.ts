import process from 'node:process'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

// https://github.com/vitejs/vite/blob/main/packages/vite/src/node/constants.ts#L35
export const configs = [
  `vite.config.js`,
  `vite.config.cjs`,
  `vite.config.mjs`,
  `vite.config.ts`,
  `vite.config.cts`,
  `vite.config.mts`,
] as const

export const hasViteConfig = (cwd = process.cwd()) => configs
  .some(config => existsSync(resolve(cwd, config)))

export const hasVite = (cwd = process.cwd()) => hasViteConfig(cwd)
