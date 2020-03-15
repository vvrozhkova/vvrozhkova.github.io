// Import global styles
import '~/assets/style/index.scss'

// Add global components
import Layout from '~/layouts/DefaultLayout.vue'

import Typography from 'typography'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueFuse from 'vue-fuse'

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.6,
  scaleRatio: 1.9,
  headerFontFamily: ['Play', 'Helvetica', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Play', 'Helvetica', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
})

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', Layout)

  Vue.use(VueAxios, axios)
  Vue.use(VueFuse)

  head.style.push({
    type: 'text/css',
    cssText: typography.toString()
  })

  head.link.push({
    rel: "stylesheet",
    href: "https://use.fontawesome.com/releases/v5.8.1/css/all.css",
    integrity: "sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf",
    crossorigin: "anonymous"
  })
}
