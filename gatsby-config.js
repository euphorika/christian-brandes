require('dotenv').config()

const spaceId = process.env.CONTENTFUL_SPACE_ID || ''
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN
const environment = process.env.CONTEXT === 'production' ? 'master' : 'staging'

const siteUrl = process.env.CONTEXT === 'production' ? process.env.URL : process.env.DEPLOY_PRIME_URL

module.exports = {
  siteMetadata: {
    siteUrl
  },
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Montserrat\:300,900`
        ]
      }
    },{
    resolve: `gatsby-source-contentful`,
      options: {
        spaceId,
        accessToken,
        environment
      },
    },{
      resolve: 'gatsby-plugin-robots-txt',
      options: process.env.CONTEXT === 'production'
        ? {
            policy: [{ userAgent: '*' }],
            sitemap: null
          }
        : {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null
          }
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Christian Brandes - Photograph Based in Hamburg",
        short_name: "Christian Brandes",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#000000",
        display: "minimal-ui",
        icon: "src/images/icon.png",
      },
    },
    `gatsby-plugin-offline`,

  ]
};
