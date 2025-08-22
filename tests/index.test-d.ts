import { assertType, describe, expectTypeOf, it } from 'vitest'
import {
  createDepValidator,
  hasVite,
  hasViteConfig,
  hasViteDep,
  hasViteDevDep,
  hasViteInPkg,
  hasVitePeerDep,
  readPkg,
} from '../src'
import type { PackageJson, PkgDepType } from '../src'

describe('typecheck', () => {
  it('should return type match', () => {
    expectTypeOf(hasVite).returns.toBeBoolean()
    expectTypeOf(hasViteConfig).returns.toBeBoolean()
    expectTypeOf(hasViteDep).returns.toBeBoolean()
    expectTypeOf(hasViteDevDep).returns.toBeBoolean()
    expectTypeOf(hasVitePeerDep).returns.toBeBoolean()
    expectTypeOf(hasViteInPkg).returns.toBeBoolean()
    expectTypeOf(createDepValidator).returns.toBeFunction()
    expectTypeOf(readPkg).returns.toBeObject()
  })

  it('should params type match', () => {
    assertType<(cwd?: string) => boolean>(hasVite)
    assertType<(cwd?: string) => boolean>(hasViteConfig)
    assertType<(cwd?: string) => boolean>(hasViteDep)
    assertType<(cwd?: string) => boolean>(hasViteDevDep)
    assertType<(cwd?: string) => boolean>(hasVitePeerDep)
    assertType<(cwd?: string) => boolean>(hasViteInPkg)
    assertType<(type: PkgDepType) => (cwd: string) => boolean>(
      createDepValidator,
    )
    assertType<(cwd?: string) => PackageJson>(readPkg)
  })
})
