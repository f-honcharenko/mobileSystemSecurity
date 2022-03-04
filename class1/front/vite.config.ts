import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from "vite-plugin-pages";
import Components from 'unplugin-vue-components/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/]
    }),
    Pages({
      pagesDir: [
          {
              dir: 'src/pages',
              baseRoute: '/',
          },
      ],
      importMode(path) {
        return "async"
      }
    }),
    Components({
      dirs: ['src/components'],
      extensions: ['vue', 'md','mjs.map'],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/,/\.js$/],
    }),
    VitePWA({
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],  
    })
  ]
})
