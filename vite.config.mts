import { defineConfig } from 'vitest/config'
import tsconfigsPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigsPaths()],
  test: {
    globals: true,
    environment: 'node',
    setupFiles: './vitest.setup.ts',
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
})
