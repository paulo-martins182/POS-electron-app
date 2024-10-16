import { resolve } from 'node:path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],

    publicDir: resolve('resources'),
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    css: {
      postcss: {
        plugins: [
          tailwindcss({
            config: resolve('tailwind.config.js'),
          }),
        ],
      },
    },
    resolve: {
      alias: {
        '@renderer': resolve('./src/renderer/src'),
        ui: resolve('./src/renderer/src/components/ui'),
      },
    },
    plugins: [react()],
  },
})
