// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'TestAutomation.Space',
  siteUrl: 'https://www.testautomation.space',
  siteDescription: 'Блог про автоматизацию тестирования и не только.',
  titleTemplate: '%s - TestAutomation.Space',

  runtimeCompiler: true,
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      // slug: true,
      // autolinkHeadings:true,
      plugins: [
        '@gridsome/remark-prismjs',
        // 'remark-emoji',
        // 'remark-math',
        // 'remark-html',
        // 'remark-html-katex'
      ]
    }
  },

  plugins: [
    {
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'Post',
        baseDir: './blog/posts/ru',
        pathPrefix: '/',
        template: './src/templates/Post.vue',
        route: '/:title',
        plugins: [
          '@gridsome/remark-prismjs'
        ],
        remark: {
          // autolinkHeadings: {
          //   content: {
          //     type: 'text',
          //     value: '#'
          //   }
          // }
        },
        refs: {
          tags: {
            typeName: 'Tag',
            route: '/tag/:id',
            create: true
          },
          category: {
            typeName: 'Category',
            route: '/category/:id',
            create: true
          }
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'RelatedTag',
        path: 'blog/tags/**/*.md',
        route: '/tag/:title',
        refs: {
          related: {
            typeName: 'RelatedTagRef',
            route: '/tag/:id',
            create: true
          },
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'RelatedCategory',
        path: 'blog/categories/**/*.md',
        route: '/category/:title',
        refs: {
          related: {
            typeName: 'RelatedCategoryRef',
            route: '/category/:id',
            create: true
          }
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Comment',
        path: 'blog/comments/**/*.md'
      }
    }
  ]
}