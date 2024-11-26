import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Esto expone el servidor en la red
    port: 3000       // Cambia el puerto si es necesario
  }
})
