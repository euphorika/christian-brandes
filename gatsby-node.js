const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allContentfulCategory {
         	  edges {
         	    node {
                slug
         	    }
         	  }
         	}
          allContentfulPost {
            edges {
              node {
                slug
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          return Promise.reject(result.errors)
        }

        const indexTemplatePath = `src/templates/indexTemplate.js`
        const postTemplatePath = `src/templates/postTemplate.js`

        result.data.allContentfulCategory.edges.forEach(({ node }) => {
          createPage({
            path: node.slug,
            component: path.resolve(indexTemplatePath),
            context: {
              slug: node.slug
            }
          })
        })

        result.data.allContentfulPost.edges.forEach(({ node }) => {
          createPage({
            path: node.slug,
            component: path.resolve(postTemplatePath),
            context: {
              slug: node.slug
            }
          })
        })

      })
    )
  })
}
