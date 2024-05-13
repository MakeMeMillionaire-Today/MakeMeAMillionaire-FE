import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './buildConfig/environments',
  plugins: [react()],
  base: process.env.PUBLIC_URL,
  build: { outDir: process.env.BUILD_PATH },
});
//-> defineConfig local:
// export default defineConfig({
//   plugins: [react()],
//   define: {
//     "process.env": process.env,
//     VITE_DOMAIN: process.env.VITE_DOMAIN,
//     VITE_CLIENT_ID: process.env.VITE_CLIENT_ID,
//     VITE_MERCADOPAGO_PUBLIC_KEY: process.env.VITE_MERCADOPAGO_PUBLIC_KEY
//   }
// })
