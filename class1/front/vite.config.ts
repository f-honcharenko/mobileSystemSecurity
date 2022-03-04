import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from "vite-plugin-pages";

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
  ]
})
