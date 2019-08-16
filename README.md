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

## Repository structure

Firstly, there are two workspace packages in `packages/*` in order to mimick sharing style dependencies through node modules:

```
packages/
├── utils
│   ├── index.css
│   └── package.json
└── variables
    ├── package.json
    └── variables.css
```

```css
/* packages/utils/index.css */
.round {
  border-radius: 8px;
}
```

```css
/* packages/variables/variables.css */
:root {
  --red: #ff0000;
}
```

The applications then are basically all the same, only the bundler and its configuration changes.
Below is the structure of the demo application which gets repeated for each bundler. The difference between "actual" and "expected" files is that the "actual" part compiles, while the "expected" part is, how we would expect them to behave:

```
$bundler/
├── global.css
├── index-{actual,expected}.js
├── package.json
├── padding.css
└── styles-{actual,expected}.css
```

The "global.css" file just contains some global css that should probably be inlined:

```css
/* $bundler/global.css */
h1 {
  font-size: 20px;
}
```

The "padding.css" file contains a class that will be used to compose from a relative path:

```css
/* $bundler/padding.css */
.padding {
  padding: 12px;
}
```

The "style.css" (or rather style-expected and style-actual) contains a relative and a modules import and a relative and a modules compose:

```css
/* $bundler/styles.css */
@import "variables/variables.css";
@import "./global.css";

.my-styles {
  color: var(--red);
  composes: padding from './padding.css';
  composes: round from "utils/index.css";
}
```

And then the "index.js" is just there as an entrypoint for the bundler and it imports the "styles.css" file:

```javascript
/* $bundler/index.js */
import styles from './styles.css';
console.log(styles);
```

And now some bundlers have problems with `@import "variables/variables.css";`, some have problems with `composes round from "utils/index.css";` and some have problems with both.

## Findings

- We were not able to get browserify or parcel to compile successfully when trying to compose from a module.
- Rollup seems to be the only implementation that works as expected.
- Webpack (and the css-loader) can compile successfully, when packages from node_modules are prepended with a `~` (tilde).
