import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from "vite-plugin-pages";
import Components from 'unplugin-vue-components/vite'
import { VitePWA } from 'vite-plugin-pwa'

const SILENT = Boolean(process.env.SILENT) ?? false;

// https://vitejs.dev/config/
export default defineConfig({
  root: process.cwd(),
	base: '/',
	publicDir: 'public',
	logLevel: SILENT ? 'error' : 'info',
  server: {
    proxy: {
      '/api/': {
        target: 'http://localhost:8000/',
      }
    }
  },
    
  resolve: {
    alias: [
      {
          find: '/~/',
          replacement: `/src/assets/`,
      },
      {
          find: '/@src/',
          replacement: `/src/`,
      },
    ],
  },
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
