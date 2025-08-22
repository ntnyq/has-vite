# has-vite

[![CI](https://github.com/ntnyq/has-vite/workflows/CI/badge.svg)](https://github.com/ntnyq/has-vite/actions)
[![NPM VERSION](https://img.shields.io/npm/v/has-vite.svg)](https://www.npmjs.com/package/has-vite)
[![NPM DOWNLOADS](https://img.shields.io/npm/dy/has-vite.svg)](https://www.npmjs.com/package/has-vite)
[![LICENSE](https://img.shields.io/github/license/ntnyq/has-vite.svg)](https://github.com/ntnyq/has-vite/blob/main/LICENSE)

> Check if a project is using [vite](https://vitejs.dev/)

## Install

**npm**:

```shell
npm install has-vite
```

**yarn**

```shell
yarn add has-vite
```

**pnpm**

```shell
pnpm add has-vite
```

## Usage

```bash
.
├── foo
│   └── package.json
└── bar
    ├── package.json
    └── vite.config.ts
```

```js
import { hasVite } from 'has-vite'

hasVite('foo') // => false

hasVite('bar') // => true
```

## API

### hasVite(cwd?)

Returns a `boolean` of whether the project is using vite.

Returns `true` if one of bellow functions return `true`:

- `hasViteConfig`
- `hasViteInPkg`

### hasViteConfig(cwd?)

Returns a `boolean` of whether the project has `vite.config.{js,cjs,mjs,ts,cts,mts}`.

### hasViteDep(cwd?)

Returns a `boolean` of whether the project has `vite` in `dependencies`.

### hasViteDevDep(cwd?)

Returns a `boolean` of whether the project has `vite` in `devDependencies`.

### hasVitePeerDep(cwd?)

Returns a `boolean` of whether the project has `vite` in `peerDependencies`.

### hasViteInPkg(cwd?)

Returns a `boolean` of whether the project has `vite` in `dependencies | devDependencies | peerDependencies`.

### readPkg(cwd?)

Returns an `object` of a project's `package.json` content, returns `{}` when `package.json` not exist in `cwd`.

## Parameters

#### cwd

Current working directory.

Type: `string`

Default: `process.cwd()`

## License

[MIT](./LICENSE) License © 2022-PRESENT [ntnyq](https://github.com/ntnyq)
