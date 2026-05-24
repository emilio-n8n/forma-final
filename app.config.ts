import { defineConfig } from '@tanstack/react-start/config'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
  server: {
    preset: 'netlify',
  },
  vite: {
    plugins: [
      TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
      tsconfigPaths({ projects: ['./tsconfig.json'] }),
      tailwindcss(),
    ],
  },
})
