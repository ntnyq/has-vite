import { describe, expect, it } from 'vitest'
import {
  configs,
  createDepValidator,
  hasVite,
  hasViteConfig,
  hasViteDep,
  hasViteDevDep,
  hasViteInPkg,
  hasVitePeerDep,
  readPkg,
} from '../src'

describe('hasVite', () => {
  it('should work as expected', () => {
    expect(hasVite()).toBeFalsy()

    expect(hasVite('tests/fixtures/empty')).toBeFalsy()
    expect(hasVite('tests/fixtures/config/none')).toBeFalsy()

    expect(hasVite('tests/fixtures/config/js')).toBeTruthy()
    expect(hasVite('tests/fixtures/config/cjs')).toBeTruthy()
    expect(hasVite('tests/fixtures/config/mjs')).toBeTruthy()

    expect(hasVite('tests/fixtures/config/ts')).toBeTruthy()
    expect(hasVite('tests/fixtures/config/cts')).toBeTruthy()
    expect(hasVite('tests/fixtures/config/mts')).toBeTruthy()
  })
})

describe('hasViteConfig', () => {
  it('should work as expected', () => {
    expect(hasViteConfig()).toBeFalsy()

    expect(hasViteConfig('tests/fixtures/config/none')).toBeFalsy()

    expect(hasViteConfig('tests/fixtures/config/js')).toBeTruthy()
    expect(hasViteConfig('tests/fixtures/config/cjs')).toBeTruthy()
    expect(hasViteConfig('tests/fixtures/config/mjs')).toBeTruthy()

    expect(hasViteConfig('tests/fixtures/config/ts')).toBeTruthy()
    expect(hasViteConfig('tests/fixtures/config/cts')).toBeTruthy()
    expect(hasViteConfig('tests/fixtures/config/mts')).toBeTruthy()
  })
})

describe('hasViteDep', () => {
  it('should work as expected', () => {
    expect(hasViteDep()).toBeFalsy()

    expect(hasViteDep('tests/fixtures/pkg/dep')).toBeTruthy()

    expect(hasViteDep('tests/fixtures/pkg/none')).toBeFalsy()
    expect(hasViteDep('tests/fixtures/pkg/dev-dep')).toBeFalsy()
    expect(hasViteDep('tests/fixtures/pkg/peer-dep')).toBeFalsy()
  })
})

describe('hasViteDevDep', () => {
  it('should work as expected', () => {
    expect(hasViteDevDep()).toBeFalsy()

    expect(hasViteDevDep('tests/fixtures/pkg/dev-dep')).toBeTruthy()

    expect(hasViteDevDep('tests/fixtures/pkg/none')).toBeFalsy()
    expect(hasViteDevDep('tests/fixtures/pkg/dep')).toBeFalsy()
    expect(hasViteDevDep('tests/fixtures/pkg/peer-dep')).toBeFalsy()
  })
})

describe('hasVitePeerDep', () => {
  it('should work as expected', () => {
    expect(hasVitePeerDep()).toBeFalsy()

    expect(hasVitePeerDep('tests/fixtures/pkg/peer-dep')).toBeTruthy()

    expect(hasVitePeerDep('tests/fixtures/pkg/none')).toBeFalsy()
    expect(hasVitePeerDep('tests/fixtures/pkg/dep')).toBeFalsy()
    expect(hasVitePeerDep('tests/fixtures/pkg/dev-dep')).toBeFalsy()
  })
})

describe('hasViteInPkg', () => {
  it('should work as expected', () => {
    expect(hasViteInPkg()).toBeFalsy()

    expect(hasViteInPkg('tests/fixtures/empty')).toBeFalsy()
    expect(hasViteInPkg('tests/fixtures/pkg/none')).toBeFalsy()

    expect(hasViteInPkg('tests/fixtures/pkg/dep')).toBeTruthy()
    expect(hasViteInPkg('tests/fixtures/pkg/dev-dep')).toBeTruthy()
    expect(hasViteInPkg('tests/fixtures/pkg/peer-dep')).toBeTruthy()
  })
})

describe('createDepValidator', () => {
  it('should work as expected', () => {
    // @ts-expect-error not included
    const hasUnknownDep = createDepValidator('unknown')
    expect(hasUnknownDep('tests/fixtures/pkg/all')).toBeFalsy()
  })
})

describe('readPkg', () => {
  it('should work as expected', () => {
    expect(readPkg('tests/fixtures/pkg/none')).toMatchInlineSnapshot('{}')
    expect(readPkg('tests/fixtures/pkg/dep')).toMatchInlineSnapshot(`
      {
        "dependencies": {
          "vite": "0.0.0",
        },
      }
    `)
    expect(readPkg('tests/fixtures/pkg/dev-dep')).toMatchInlineSnapshot(`
      {
        "devDependencies": {
          "vite": "0.0.0",
        },
      }
    `)
    expect(readPkg('tests/fixtures/pkg/peer-dep')).toMatchInlineSnapshot(`
      {
        "peerDependencies": {
          "vite": "0.0.0",
        },
      }
    `)
    expect(readPkg('tests/fixtures/pkg/all')).toMatchInlineSnapshot(`
      {
        "dependencies": {
          "vite": "0.0.0",
        },
        "devDependencies": {
          "vite": "0.0.0",
        },
        "optionalDependencies": {
          "vite": "0.0.0",
        },
        "peerDependencies": {
          "vite": "0.0.0",
        },
      }
    `)
  })
})

describe('configs', () => {
  it('should match snapshot', () => {
    expect(Object.values(configs)).toMatchInlineSnapshot(`
      [
        "vite.config.js",
        "vite.config.cjs",
        "vite.config.mjs",
        "vite.config.ts",
        "vite.config.cts",
        "vite.config.mts",
      ]
    `)
  })
})
