import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'

/**
 * checked package name
 */
const VITE = 'vite'

/**
 * package json filed for `createDepValidator`
 */
export type PkgDepType = 'dependencies' | 'devDependencies' | 'peerDependencies'

export type DepValidator = (cwd?: string) => boolean

/**
 * vite supported config files
 * @see https://github.com/vitejs/vite/blob/main/packages/vite/src/node/constants.ts
 */
export const configs = [
  'vite.config.js',
  'vite.config.cjs',
  'vite.config.mjs',
  'vite.config.ts',
  'vite.config.cts',
  'vite.config.mts',
] as const

/**
 * read `package.json`
 * @param cwd - current working directory
 * @returns package object, `{}` if not exist
 */
export const readPkg = (cwd: string = process.cwd()): Record<string, any> => {
  const pkgPath = resolve(cwd, 'package.json')
  if (!existsSync(pkgPath)) return {}
  return JSON.parse(readFileSync(pkgPath, 'utf-8')) as Record<string, any>
}

/**
 * Create a validator to check if `vite` is included in given type of deps of package.json
 * @param type - type of dep
 * @returns a validator
 */
export const createDepValidator =
  (type: PkgDepType): DepValidator =>
  (cwd: string = process.cwd()) => {
    const pkg = readPkg(cwd)
    if (!pkg[type]) return false
    return Object.keys(pkg[type]).includes(VITE)
  }

/**
 * check if `dependencies` includes `vite` in package.json
 * @param cwd - current working directory
 * @returns `true` if includes
 */
export const hasViteDep: DepValidator = createDepValidator('dependencies')

/**
 * check if `devDependencies` includes `vite` in package.json
 * @param cwd - current working directory
 * @returns `true` if includes
 */
export const hasViteDevDep: DepValidator = createDepValidator('devDependencies')

/**
 * check if `peerDependencies` includes `vite` in package.json
 * @param cwd - current working directory
 * @returns `true` if includes
 */
export const hasVitePeerDep: DepValidator = createDepValidator('peerDependencies')

/**
 * check if `dependencies`, `devDependencies`, or `peerDependencies` includes `vite` in package.json
 * @param cwd - current working directory
 * @returns `true` if includes
 */
export const hasViteInPkg = (cwd: string = process.cwd()): boolean =>
  hasViteDep(cwd) || hasViteDevDep(cwd) || hasVitePeerDep(cwd)

/**
 * check if `vite.config.{js,ts,cjs,cts,mjs,mts}` exists in `cwd`
 * @param cwd - current working directory
 * @returns `true` if exists
 */
export const hasViteConfig = (cwd: string = process.cwd()): boolean =>
  configs.some(config => existsSync(resolve(cwd, config)))

/**
 * check if `hasViteConfig` or `hasViteInPkg` return true
 * @param cwd - current working directory
 * @returns `true` if one return true
 *
 * @example
 * ```
 * import { hasVite } from 'has-vite'
 * hasVite('path-to-package-json') // true or false
 * ```
 */
export const hasVite = (cwd: string = process.cwd()): boolean =>
  hasViteConfig(cwd) || hasViteInPkg(cwd)
