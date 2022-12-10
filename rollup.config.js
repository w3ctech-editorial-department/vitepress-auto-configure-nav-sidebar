import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'

import { main as file1, module as file2 } from './package.json'

// rollup.config.js
export default {
  input: 'src/index.ts',
  output: [
    {
      file: file1,
      format: 'cjs',
      exports: 'default',
    },
    {
      file: file2,
      format: 'es',
    },
  ],
  plugins: [
    nodeResolve(),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    terser(),
  ],
}
