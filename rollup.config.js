import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import {terser} from 'rollup-plugin-terser'
import copy from 'rollup-plugin-copy'
import typescript from '@rollup/plugin-typescript'

const plugins = (outputDir) => [
  babel({
    exclude: 'node_modules/**'
  }),
  resolve(),
  commonjs(),
  terser(),
  typescript(),
  copy({
    'src/transform': `${outputDir}/transform`
  })
]

const generateConfig = (integration) => ({
  input: `src/${integration}.ts`,
  output: {
    file: `lib/${integration}.ts`,
    format: 'cjs'
  },
  plugins: plugins('lib')
})

module.exports = [generateConfig('optimizely'), generateConfig('simple')]
