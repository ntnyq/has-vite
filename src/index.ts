import process from 'node:process'
import { resolve } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'

/**
 * checked package name
 */
const VITE = 'vite'

/**
 * package json filed for `createDepValidator`
 */
export type PkgDepType = 'dependencies' | 'devDependencies' | 'peerDependencies'

/**
 * vite supported config files
 * @see https://github.com/vitejs/vite/blob/main/packages/vite/src/node/constants.ts
 */
export const configs = <const>[
  'vite.config.js',
  'vite.config.cjs',
  'vite.config.mjs',
  'vite.config.ts',
  'vite.config.cts',
  'vite.config.mts',
]

/**
 * read `package.json`
 * @param cwd current working directory
 * @returns package object, `{}` if not exist
 */
export const readPkg = (cwd = process.cwd()) => {
  const pkgPath = resolve(cwd, 'package.json')
  if (!existsSync(pkgPath)) return {}
  return JSON.parse(readFileSync(pkgPath, 'utf-8'))
}

/**
 * Create a validator to check if `vite` is included in given `key` of package.json
 * @param key package.json field
 * @returns a validator
 */
export const createDepValidator = (key: PkgDepType) => (cwd = process.cwd()) => {
  const pkg = readPkg(cwd)
  if (!pkg[key]) return false
  return Object.keys(pkg[key]).includes(VITE)
}

/**
 * check if `dependencies` includes `vite` in package.json
 * @param cwd current working directory
 * @returns `true` if includes
 */
export const hasViteDep = createDepValidator('dependencies')

/**
 * check if `devDependencies` includes `vite` in package.json
 * @param cwd current working directory
 * @returns `true` if includes
 */
export const hasViteDevDep = createDepValidator('devDependencies')

/**
 * check if `peerDependencies` includes `vite` in package.json
 * @param cwd current working directory
 * @returns `true` if includes
 */
export const hasVitePeerDep = createDepValidator('peerDependencies')

/**
 * check if `dependencies`, `devDependencies`, or `peerDependencies` includes `vite` in package.json
 * @param cwd current working directory
 * @returns `true` if includes
 */
export const hasViteInPkg = (cwd = process.cwd()) => hasViteDep(cwd)
|| hasViteDevDep(cwd)
|| hasVitePeerDep(cwd)

/**
 * check if `vite.config.{js,ts,cjs,cts,mjs,mts}` exists in `cwd`
 * @param cwd current working directory
 * @returns `true` if exists
 */
export const hasViteConfig = (cwd = process.cwd()) =>
  configs.some(config => existsSync(resolve(cwd, config)))

/**
 * check if `hasViteConfig` or `hasViteInPkg` return true
 * @param cwd current working directory
 * @returns `true` if one return true
 *
 * @example
 * ```
 * import { hasVite } from 'has-vite'
 * hasVite(`packages/core`) // true or false
 * ```
 */
export const hasVite = (cwd = process.cwd()) => hasViteConfig(cwd) || hasViteInPkg(cwd)
