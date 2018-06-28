const path = require("path");

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  return graphql(`
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
      allContentfulVimeoPost {
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
    const vimeoTemplatePath = `src/templates/postVimeoTemplate.js`

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

    result.data.allContentfulVimeoPost.edges.forEach(({ node }) => {
      createPage({
        path: node.slug,
        component: path.resolve(vimeoTemplatePath),
        context: {
          slug: node.slug
        }
      })
    })
  })
}
