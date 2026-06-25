# Dynamic Components — Build Status

58/63 packages build successfully. 5 require follow-up.

## Failing builds

### `pleadings`
`SvgArrowUpward` and `SvgArrowDownward` are not exported from the built `@republik/icons` dist, despite existing in its source. The icons package dist may need to be rebuilt, or the imports need to be replaced with whatever the icons package actually exports.

### `questionnaire`
Missing `lodash` — the source imports `lodash/get`. Add `lodash` as a dependency.

### `sozialhilfe-simulation`
Missing `d3-ease` — used in animations. Add `d3-ease` as a dependency.

### `talk-to-the-machine`
Imports `babel-runtime/regenerator` — a legacy Babel runtime dep that was removed during migration. Replace with `@babel/runtime/regenerator` or refactor the async code to not require it.

### `who-takes-the-cake`
`react-icons` v2 parse error: the `Md3dRotation` symbol can't be parsed from the v2 package in the current build toolchain. Either upgrade the imports to `react-icons` v4+ naming conventions (`import { Md3dRotation } from 'react-icons/md'`) or find an alternative.

## Skipped (intentional)

None — the 5 above are the only known failures.

## Notes

- All 63 packages were migrated from rollup (AMD) to vite (ES module lib build).
- `.js` files containing JSX were renamed to `.jsx` (294 files total).
- Workspace package references updated to `workspace:*`:
  - `@project-r/styleguide`
  - `@republik/remark-preset` (was `@orbiting/remark-preset`)
  - `@republik/mdast-react-render` (was `mdast-react-render`)
- Legacy apollo deps (`react-apollo`, `apollo-client`, etc.) retained as-is for now; to be migrated to `@apollo/client` later.
- Each package registers its main component as a web component via `@r2wc/react-to-web-component` under the `republik-{slug}` custom element name.
