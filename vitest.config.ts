import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    // setupFiles: ['./vitest.setup.ts'],
    include: ['./src/**/*.spec.@(ts|tsx)'],
    globals: true,
    environment: 'jsdom',
    clearMocks: true,
  },
})
