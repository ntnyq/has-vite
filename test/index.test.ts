import { describe, expect, it } from 'vitest'
import { configs, hasVite, hasViteConfig } from '../src'

describe(`hasVite`, () => {
  it(`should work as expected`, () => {
    expect(hasVite()).toBeTruthy()

    expect(hasVite(`test/fixtures/pkg`)).toBeFalsy()

    expect(hasVite(`test/fixtures/js`)).toBeTruthy()
    expect(hasVite(`test/fixtures/cjs`)).toBeTruthy()
    expect(hasVite(`test/fixtures/mjs`)).toBeTruthy()

    expect(hasVite(`test/fixtures/ts`)).toBeTruthy()
    expect(hasVite(`test/fixtures/cts`)).toBeTruthy()
    expect(hasVite(`test/fixtures/mts`)).toBeTruthy()
  })
})

describe(`hasViteConfig`, () => {
  it(`should work as expected`, () => {
    expect(hasViteConfig()).toBeTruthy()

    expect(hasViteConfig(`test/fixtures/pkg`)).toBeFalsy()

    expect(hasViteConfig(`test/fixtures/js`)).toBeTruthy()
    expect(hasViteConfig(`test/fixtures/cjs`)).toBeTruthy()
    expect(hasViteConfig(`test/fixtures/mjs`)).toBeTruthy()

    expect(hasViteConfig(`test/fixtures/ts`)).toBeTruthy()
    expect(hasViteConfig(`test/fixtures/cts`)).toBeTruthy()
    expect(hasViteConfig(`test/fixtures/mts`)).toBeTruthy()
  })
})

describe(`configs`, () => {
  it(`should match snapshot`, () => {
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
