import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import packageJson from './package.json' with { type: 'json' };

// export default [
//   {
//     input: 'src/index.ts',
//     output: [
//       {
//         file: 'dist/cjs/index.js',
//         format: 'cjs',
//         sourcemap: true,
//       },
//       {
//         file: 'dist/esm/index.js',
//         format: 'esm',
//         sourcemap: true,
//       },
//     ],
//     plugins: [
//       resolve(),
//       commonjs(),
//       typescript({
//         tsconfig: './tsconfig.json',
//         declaration: true,
//         // declarationDir: 'dist/types',
//         exclude: ['**/*.test.tsx', '**/*.test.ts', '**/*.stories.ts'],
//         declarationMap:false 
//       }),
        
//       postcss({ extensions: ['.css'], inject: true, extract: false }),
//     ],
//   },
//   {
//     input: 'dist/types/esm/index.d.ts',
//     output: [{ file: 'dist/esm/index.d.ts', format: 'esm' },
//       { file: 'dist/cjs/index.d.ts', format: 'esm' }
//     ],
//     plugins: [dts()],
//     external: [/\.css$/],
//   },
// ];


export default [
  // CommonJS Build
  {
    input: 'src/index.ts',
    output: {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist/cjs',
      }),
      postcss({
        extensions: ['.css'],
        inject: true,
        extract: false,
      }),
    ],
  },
  // ESM Build
  {
    input: 'src/index.ts',
    output: {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist/esm',
      }),
      postcss({
        extensions: ['.css'],
        minimize:true,
        sourceMap:true,
        modules:true,
        inject: {insertAt : 'top'},
        extract:true
      }),
    ],
    external: ['react', 'react-dom']
  },
  // DTS Bundler
  {
    input: 'dist/esm/index.d.ts', // Use one of the declaration files as input
    output: {
      file: 'dist/index.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
    external: [/\.css$/]
  },
];
