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
        path: `${__dirname}/posts`,
        name: `posts`,
      },
    },{
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/category`,
        name: `category`,
      },
    },{
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${__dirname}/static/assets`,
          name: `img`,
        }
    },{
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1600,
              quality: 90,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
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
    `gatsby-plugin-netlify-cms`,
  ]
};
