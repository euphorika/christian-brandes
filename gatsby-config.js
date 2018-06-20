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
        spaceId: `vjfa4ov0wqx1`,
        accessToken: `91e716a8a31b8b397a4cf258ee021d98537a9c784b6d691b2c46d0f1ba7fe7b9`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ]
};
