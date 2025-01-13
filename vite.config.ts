import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/Kumbulink/',
  plugins: [
    react(),
    VitePWA({ 
      registerType: 'autoUpdate',
      manifest: {
        name: 'Kumbulink',
        short_name: 'kumbulink',
        start_url: '/Kumbulink/',
        description: 'Conectamos quem precisa trocar e enviar dinheiro, de forma direta, simples e segura',
        theme_color: '#2B4420',
        display: "standalone",
        background_color: "#ffffff",
        icons: [
          {
            src: '/Kumbulink/icon/48x48.png',
            sizes: '48x48',
            type: 'image/png'
          },
          {
            src: '/Kumbulink/icon/96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: '/Kumbulink/icon/144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: '/Kumbulink/icon/192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ],
      }
     })
  ],
})
