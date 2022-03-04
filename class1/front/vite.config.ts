import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from "vite-plugin-pages";
import Components from 'unplugin-vue-components/vite'

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
  ]
})
