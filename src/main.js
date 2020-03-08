// Import global styles
import '~/assets/style/index.scss'

// Add global components
import Layout from '~/layouts/Default.vue'

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
}
