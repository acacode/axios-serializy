const packageJson = require('./package.json')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const terser = require('rollup-plugin-terser').terser
// const commonjs = require('rollup-plugin-commonjs')

const deps = [...Object.keys(packageJson.peerDependencies || {})]

const inputOutputConfig = (outputFile, outputFormat, commonOutput = {}) => ({
  input: 'src/index.js',
  output: {
    file: `${outputFile}`,
    format: outputFormat,
    ...commonOutput,
  },
})

const productionBuildPlugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  terser({
    compress: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      warnings: false,
      arguments: true,
      toplevel: true,
      unsafe_Function: true,
      module: true,
      unsafe_proto: true,
    },
    mangle: {
      properties: {
        reserved: [
          'model',
          'deserialize',
          'serialize',
          'data',
          'inspectors',
          'response',
          'request',
          'isError',
          'interceptors',
          'axiosSerializy',
          'serializeResponseData',
          'deserializeRequestData',
          'use',
          'setErrorModel',
        ],
      },
      module: true,
      toplevel: true,
    },
  }),
]

module.exports = [
  // Common JS builds
  {
    ...inputOutputConfig('lib/axios-serializy.js', 'cjs'),
    external: deps,
    plugins: [resolve(), babel()],
  },
  {
    ...inputOutputConfig('lib/axios-serializy.min.js', 'cjs'),
    external: deps,
    plugins: [resolve(), babel(), ...productionBuildPlugins],
  },

  // EcmaScript builds
  {
    ...inputOutputConfig('es/axios-serializy.js', 'es'),
    external: deps,
    plugins: [resolve(), babel()],
  },
  {
    ...inputOutputConfig('es/axios-serializy.mjs', 'es'),
    external: deps,
    plugins: [resolve(), babel(), ...productionBuildPlugins],
  },

  // UMD builds
  {
    ...inputOutputConfig('dist/axios-serializy.js', 'umd', {
      name: 'axiosSerializy',
      globals: {
        axios: 'axios',
      },
    }),
    external: deps,
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**',
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
    ],
  },
  {
    ...inputOutputConfig('dist/axios-serializy.min.js', 'umd', {
      name: 'axiosSerializy',
      globals: {
        axios: 'axios',
      },
    }),
    external: deps,
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**',
      }),
      ...productionBuildPlugins,
    ],
  },
]
