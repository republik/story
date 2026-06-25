import typescript from 'rollup-plugin-typescript'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import json from 'rollup-plugin-json'
import { uglify } from 'rollup-plugin-uglify'

import { join } from 'path'

export default {
  input: join('src', 'index.ts'),
  output: {
    file: join('build', 'index.js'),
    format: 'amd'
  },
  external: [
    'react',
    'prop-types',
    'glamor',
    '@project-r/styleguide',
    '@project-r/styleguide/chart',
    'react-apollo',
    'graphql-tag'
  ],
  plugins: [
    typescript({ include: ['*.(j|t)s+(|x)', '**/*.(j|t)s+(|x)'] }),
    resolve(),
    commonjs(),
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    process.env.NODE_ENV === 'production' && uglify()
  ]
}
