import sass from 'rollup-plugin-sass'
import typescript from 'rollup-plugin-typescript2'
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import commonjs from "@rollup/plugin-commonjs";

import pkg from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
        strict: false
      },
      {
        file:pkg.module,
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      //sass({ insert: true }),
      //peerDepsExternal(),
      nodeResolve(),
      commonjs(),
      typescript({ useTsconfigDeclarationDir: true }),
      postcss()
    ]
  },
  /*{
    input: 'examples/demo1.js',
    output: [
      {
        file: 'examples/demo1/demo1.iife.js',
        format: 'iife',
        exports: 'named',
        sourcemap: true,
        strict: false,
        globals: {
          'react':'React',
          'react-dom':'ReactDOM'
        }

      }
    ],
    plugins: [
      sass({ insert: true }),
      babel({
        presets: ['@babel/env', '@babel/preset-react']
      }),
      nodeResolve()
    ],
    external: ['react', 'react-dom'],

  }*/
]
