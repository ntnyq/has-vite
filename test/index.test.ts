import {
  describe,
  expect,
  it,
} from 'vitest'
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
} from 'has-vite'

describe('hasVite', () => {
  it('should work as expected', () => {
    expect(hasVite()).toBeFalsy()

    expect(hasVite('test/fixtures/empty')).toBeFalsy()
    expect(hasVite('test/fixtures/config/none')).toBeFalsy()

    expect(hasVite('test/fixtures/config/js')).toBeTruthy()
    expect(hasVite('test/fixtures/config/cjs')).toBeTruthy()
    expect(hasVite('test/fixtures/config/mjs')).toBeTruthy()

    expect(hasVite('test/fixtures/config/ts')).toBeTruthy()
    expect(hasVite('test/fixtures/config/cts')).toBeTruthy()
    expect(hasVite('test/fixtures/config/mts')).toBeTruthy()
  })
})

describe('hasViteConfig', () => {
  it('should work as expected', () => {
    expect(hasViteConfig()).toBeFalsy()

    expect(hasViteConfig('test/fixtures/config/none')).toBeFalsy()

    expect(hasViteConfig('test/fixtures/config/js')).toBeTruthy()
    expect(hasViteConfig('test/fixtures/config/cjs')).toBeTruthy()
    expect(hasViteConfig('test/fixtures/config/mjs')).toBeTruthy()

    expect(hasViteConfig('test/fixtures/config/ts')).toBeTruthy()
    expect(hasViteConfig('test/fixtures/config/cts')).toBeTruthy()
    expect(hasViteConfig('test/fixtures/config/mts')).toBeTruthy()
  })
})

describe('hasViteDep', () => {
  it('should work as expected', () => {
    expect(hasViteDep()).toBeFalsy()

    expect(hasViteDep('test/fixtures/pkg/dep')).toBeTruthy()

    expect(hasViteDep('test/fixtures/pkg/none')).toBeFalsy()
    expect(hasViteDep('test/fixtures/pkg/dev-dep')).toBeFalsy()
    expect(hasViteDep('test/fixtures/pkg/peer-dep')).toBeFalsy()
  })
})

describe('hasViteDevDep', () => {
  it('should work as expected', () => {
    expect(hasViteDevDep()).toBeFalsy()

    expect(hasViteDevDep('test/fixtures/pkg/dev-dep')).toBeTruthy()

    expect(hasViteDevDep('test/fixtures/pkg/none')).toBeFalsy()
    expect(hasViteDevDep('test/fixtures/pkg/dep')).toBeFalsy()
    expect(hasViteDevDep('test/fixtures/pkg/peer-dep')).toBeFalsy()
  })
})

describe('hasVitePeerDep', () => {
  it('should work as expected', () => {
    expect(hasVitePeerDep()).toBeFalsy()

    expect(hasVitePeerDep('test/fixtures/pkg/peer-dep')).toBeTruthy()

    expect(hasVitePeerDep('test/fixtures/pkg/none')).toBeFalsy()
    expect(hasVitePeerDep('test/fixtures/pkg/dep')).toBeFalsy()
    expect(hasVitePeerDep('test/fixtures/pkg/dev-dep')).toBeFalsy()
  })
})

describe('hasViteInPkg', () => {
  it('should work as expected', () => {
    expect(hasViteInPkg()).toBeFalsy()

    expect(hasViteInPkg('test/fixtures/empty')).toBeFalsy()
    expect(hasViteInPkg('test/fixtures/pkg/none')).toBeFalsy()

    expect(hasViteInPkg('test/fixtures/pkg/dep')).toBeTruthy()
    expect(hasViteInPkg('test/fixtures/pkg/dev-dep')).toBeTruthy()
    expect(hasViteInPkg('test/fixtures/pkg/peer-dep')).toBeTruthy()
  })
})

describe('createDepValidator', () => {
  it('should work as expected', () => {
    // @ts-expect-error not included
    const hasUnknownDep = createDepValidator('unknown')
    expect(hasUnknownDep('test/fixtures/pkg/all')).toBeFalsy()
  })
})

describe('readPkg', () => {
  it('should work as expected', () => {
    expect(readPkg('test/fixtures/pkg/none')).toMatchInlineSnapshot('{}')
    expect(readPkg('test/fixtures/pkg/dep')).toMatchInlineSnapshot(`
      {
        "dependencies": {
          "vite": "0.0.0",
        },
      }
    `)
    expect(readPkg('test/fixtures/pkg/dev-dep')).toMatchInlineSnapshot(`
      {
        "devDependencies": {
          "vite": "0.0.0",
        },
      }
    `)
    expect(readPkg('test/fixtures/pkg/peer-dep')).toMatchInlineSnapshot(`
      {
        "peerDependencies": {
          "vite": "0.0.0",
        },
      }
    `)
    expect(readPkg('test/fixtures/pkg/all')).toMatchInlineSnapshot(`
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
