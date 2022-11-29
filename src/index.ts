import process from 'node:process'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const VITE = `vite`

export type PkgDepType = `dependencies` | `devDependencies` | `peerDependencies`

// https://github.com/vitejs/vite/blob/main/packages/vite/src/node/constants.ts#L35
export const configs = <const>[
  `vite.config.js`,
  `vite.config.cjs`,
  `vite.config.mjs`,
  `vite.config.ts`,
  `vite.config.cts`,
  `vite.config.mts`,
]

export const readPkg = (cwd = process.cwd()) => {
  const pkgPath = resolve(cwd, `package.json`)
  if (!existsSync(pkgPath)) return {}
  return JSON.parse(readFileSync(pkgPath, `utf-8`))
}

export const createDepValidator = (key: PkgDepType) => (cwd = process.cwd()) => {
  const pkg = readPkg(cwd)
  if (!pkg[key]) return false
  return Object.keys(pkg[key]).includes(VITE)
}

export const hasViteDep = createDepValidator(`dependencies`)

export const hasViteDevDep = createDepValidator(`devDependencies`)

export const hasVitePeerDep = createDepValidator(`peerDependencies`)

export const hasViteInPkg = (cwd = process.cwd()) => hasViteDep(cwd)
|| hasViteDevDep(cwd)
|| hasVitePeerDep(cwd)

export const hasViteConfig = (cwd = process.cwd()) =>
  configs.some(config => existsSync(resolve(cwd, config)))

export const hasVite = (cwd = process.cwd()) => hasViteConfig(cwd) || hasViteInPkg(cwd)
