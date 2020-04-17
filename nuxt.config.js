module.exports = {

  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'pr_sneakers',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    {src: '@/assets/sass/index.sass', lang: 'sass'}
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: 'red' },
  /*
  ** Build configuration
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/recaptcha',
    'cookie-universal-nuxt'
  ],

  /* 
  ** Options AXIOS
  */
  axios: {
    baseURL:"https://sneakerdraws.com/api"
  },
  
  /*
  ** Options Recaptcha
  */
  recaptcha: {
    siteKey: '6LdUWd4UAAAAAHhyCOFw7cgXpKeiWAUmSruRrb_P',
    version: 2,
    size: 'normal'
  },
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

