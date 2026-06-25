import typescript from 'rollup-plugin-typescript'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import json from 'rollup-plugin-json'

import { join, basename, extname, dirname } from 'path'

export default [
  ['indicators/index.ts', 'indicators.js'],
  ['banner/index.ts', 'banner.js'],
  ['timeline/index.ts', 'timeline.js'],
  ['quotes/index.ts', 'quotes.js'],
].map(([entryFile, outputFile]) => ({
  input: join('src', entryFile),
  output: {
    file: join(
      'build',
      outputFile || `${basename(entryFile, extname(entryFile))}.js`,
    ),
    format: 'amd',
  },
  external: [
    'react',
    'prop-types',
    'glamor',
    '@project-r/styleguide',
    '@project-r/styleguide/chart',
    'react-apollo', 'graphql-tag'
  ],
  plugins: [
    typescript({ include: ['*.(j|t)s+(|x)', '**/*.(j|t)s+(|x)'] }),
    resolve(),
    commonjs(),
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
}))
