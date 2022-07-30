// Import global styles
import '~/assets/style/index.scss'

// Add global components
import Layout from '~/layouts/DefaultLayout.vue'
import Section from '~/components/Section.vue'

import Typography from 'typography'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueFuse from 'vue-fuse'

import 'katex/dist/katex.min.css'
import '~/assets/style/mermaid/default/index.scss'

// require("gridsome-plugin-remark-prismjs-all/themes/night-owl.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css")
require("prismjs/plugins/command-line/prism-command-line.css")

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
  Vue.component('Section', Section)

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

  head.script.push({
    src: '//cookieinfoscript.com/js/cookieinfo.min.js',
    id: 'cookieinfo', 'data-message': 'Мы используем куки, чтобы улучшить ваш пользовательский опыт. Продолжая посещать этот сайт, вы соглашаетесь на использование нами файлов',
    'data-linkmsg': 'cookie.'
  });
}
