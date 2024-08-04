// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss','@pinia/nuxt','@nuxt/image',],

    //Meta and SEO
    app: {
        head: {
            title:'Connexion',
            titleTemplate:"%s - Project Manager",
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            link:[
                {href:"https://fonts.googleapis.com/icon?family=Material+Icons",rel:"stylesheet"},
            ]
        }
    },
    nitro: {
        devProxy: {
            "/api": {
                target:"http://localhost:4040/api",
                changeOrigin: true,
                prependPath: true,
            }
        }
    },
})
