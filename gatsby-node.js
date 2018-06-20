const path = require("path");
const crypto = require("crypto")
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`);

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
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              root
              title
              thumbnail
              row {
                rowImages {
                  image
                }
              }
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const postTemplatePath = `src/templates/postTemplate.js`
    const indexTemplatePath = `src/templates/indexTemplate.js`

    result.data.allContentfulCategory.edges.forEach(({ node }) => {
      createPage({
        path: node.slug,
        component: path.resolve(indexTemplatePath),
        context: {
          slug: node.slug
        }
      })
    })

    /*result.data.allMarkdownRemark.edges.forEach(({ node }) => {

      if (!node.frontmatter.root) {
        const images = _.map(_.flatten(_.map(node.frontmatter.row, 'rowImages')), 'image').join('|')

        createPage({
          path: node.fields.slug,
          component: path.resolve(postTemplatePath),
          context: {
            slug: node.fields.slug,
            headerImage: '/' + node.frontmatter.thumbnail + '/',
            images: '/' + images + '/'
          },
        });
      }
    })*/
  });
};

exports.onCreateNode = ({ node, getNode, getNodes, boundActionCreators }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const { createNodeField, createNode } = boundActionCreators
    const slug = node.frontmatter.root ? '/' : createFilePath({ node, getNode, basePath: `pages` })

    createNodeField({
      node,
      name: `slug`,
      value: slug
    })

  }

}
