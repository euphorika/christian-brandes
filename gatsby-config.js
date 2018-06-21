require('dotenv').config()

const spaceId = process.env.CONTENTFUL_SPACE_ID || ''
const accessToken = process.env.CONTEXT === 'production' ? process.env.CONTENTFUL_ACCESS_TOKEN : process.env.CONTENTFUL_PREVIEW_TOKEN
const host = process.env.CONTEXT === 'production' ? 'cdn.contentful.com': 'preview.contentful.com'

module.exports = {
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
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${__dirname}/static/assets`,
          name: `img`,
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
        ? { policy: [{ userAgent: '*' }] }
        : {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null
          }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ]
};
