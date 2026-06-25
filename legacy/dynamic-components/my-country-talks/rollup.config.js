import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import replace from 'rollup-plugin-replace'

import { join } from 'path'

export default [['index.js']].map(
  ([fileName]) => ({
    input: join('src', fileName),
    output: {
      file: join('build', fileName),
      format: 'amd'
    },
    external: ['react', 'prop-types', 'glamor'],
    plugins: [
      json(),
      babel({
        runtimeHelpers: true,
        exclude: 'node_modules/**',
        presets: [
          '@babel/react',
          [
            '@babel/env',
            {
              targets: {
                browsers: [
                  'last 2 versions',
                  'safari >= 7'
                ]
              },
              modules: false
            }
          ]
        ]
      }),
      resolve(),
      commonjs(),
      replace({
        'process.env.NODE_ENV': JSON.stringify(
          'production'
        )
      })
    ].filter(Boolean)
  })
)
