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
        name: "posts",
      },
    },{
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/category`,
        name: "category",
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-netlify-cms',
  ]
};
