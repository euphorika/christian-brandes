require('dotenv').config()

const spaceId = process.env.CONTENTFUL_SPACE_ID || ''
const accessToken = process.env.CONTEXT === 'production' ? process.env.CONTENTFUL_ACCESS_TOKEN : process.env.CONTENTFUL_PREVIEW_TOKEN
const host = process.env.CONTEXT === 'production' ? 'cdn.contentful.com': 'preview.contentful.com'

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
        host
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
  ]
};
