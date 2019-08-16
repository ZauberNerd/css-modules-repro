# Differences in CSS Modules file resolution

The [CSS Modules documentation](https://github.com/css-modules/css-modules) states that:
> All URLs (`url(...)`) and `@imports` are in module request format (`./xxx` and `../xxx` means relative, `xxx` and `xxx/yyy` means in modules folder, i. e. in `node_modules`).

Unfortunately the implementations in the most popular bundlers are quite different or even broken.

This is a [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) monorepo that contains the most minimalistic example apps for four different bundlers to showcase how their implementations differ.

## Installation and running

Check out this repository and execute `yarn` in the top level directory to install all dependencies and link the workspaces together.

Then execute one of the following commands which will run the examples that use CSS Modules as per their documentation:

- `yarn build:browserify:actual`
- `yarn build:parcel:actual`
- `yarn build:rollup:actual`
- `yarn build:webpack:actual`

There is also a different set of commands that will run modified examples that "work" for these bundlers (note: some even fail with modifications):

- `yarn build:browserify:expected`
- `yarn build:parcel:expected`
- `yarn build:rollup:expected`
- `yarn build:webpack:expected`

## Findings

- We were not able to get browserify or parcel to compile successfully when trying to compose from a module.
- Rollup seems to be the only implementation that works as expected.
- Webpack (and the css-loader) can compile successfully, when packages from node_modules are prepended with a `~` (tilde).
