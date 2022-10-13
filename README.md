# has-vite

[![CI](https://github.com/ntnyq/has-vite/workflows/CI/badge.svg)](https://github.com/ntnyq/has-vite/actions)
[![NPM VERSION](https://img.shields.io/npm/v/ntnyq/has-vite.svg)](https://www.npmjs.com/package/ntnyq/has-vite)
[![Coverage Status](https://coveralls.io/repos/github/ntnyq/has-vite/badge.svg?branch=main)](https://coveralls.io/github/ntnyq/has-vite?branch=main)
[![LICENSE](https://img.shields.io/github/license/ntnyq/has-vite.svg)](https://github.com/ntnyq/has-vite/blob/main/LICENSE)

> Check if a project is using [vite](https://vitejs.dev/)

## Install

```shell
$ npm install has-vite
# or
$ yarn add has-vite
# or
$ pnpm add has-vite
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

hasVite(`foo`) // => false

hasVite(`bar`) // => true
```

## API

### hasVite(cwd?)

Returns a `boolean` of whether the project is using vite.

#### cwd

Type: `string`

Default: `process.cwd()`

### hasViteConfig(cwd?)

Returns a `boolean` of whether the project has `vite.config.{js,cjs,mjs,ts,cts,mts}`.

#### cwd

Type: `string`

Default: `process.cwd()`

## TODO

-   Check `vite` field of `package.json`

## License

[MIT](./LICENSE) License © 2022 [ntnyq](https://github.com/ntnyq)
