import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    https: {
      key: fs.readFileSync('./config/key.pem'),
      cert: fs.readFileSync('./config/cert.pem'),
    }
    },
})
