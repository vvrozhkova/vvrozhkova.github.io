// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import '~/assets/css/styles.scss'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueFuse from 'vue-fuse'
import 'prismjs/themes/prism-okaidia.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

export default function (Vue, { head }) {
    // Set default layout as a global component
    Vue.use(BootstrapVue);
    Vue.component('Layout', DefaultLayout);
    Vue.use(VueAxios, axios)
    Vue.use(VueFuse);
    head.link.push({
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.8.1/css/all.css",
        integrity: "sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf",
        crossorigin: "anonymous"
    });
    head.bodyAttrs = { class: 'body commonBody' };
    head.htmlAttrs = { lang: "ru-RU" }

    head.script.push({
        src: '//cookieinfoscript.com/js/cookieinfo.min.js',
        id: 'cookieinfo', 'data-message': 'Мы используем куки, чтобы улучшить ваш пользовательский опыт. Продолжая посещать этот сайт, вы соглашаетесь на использование нами файлов',
        'data-linkmsg': 'cookie.'
    });

}