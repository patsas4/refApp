import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [{
          urlPattern: ({ url, sameOrigin }) => {
            const pathname = (url as any)?.pathname ?? new (globalThis as any).URL(String(url)).pathname;
            return pathname.startsWith('/api') || sameOrigin;
          },
          handler: "NetworkFirst" as const,
          options: {
            cacheName: "api-cache",
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }],
      },
      devOptions: {
        enabled: true,
      },
      strategies: 'generateSW',
      injectRegister: 'auto',
      injectManifest: {},
      manifest: {
        name: "RefApp",
        short_name: "RefApp",
        display: "standalone",
        start_url: "/",
        theme_color: "#0d6efd",
        background_color: "#ffffff",
        icons: [
          { src: "vite.svg", sizes: "192x192", type: "image/png" },
          { src: "vite.svg", sizes: "512x512", type: "image/png" }
        ]
      }
    })
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})


