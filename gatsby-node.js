const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              root
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
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const templatePath = `src/templates/postTemplate.js`

      if (!node.frontmatter.root) {
        createPage({
          path: node.fields.slug,
          component: path.resolve(templatePath),
          context: {
            slug: node.fields.slug
          },
        });
      }
    });
  });
};

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const { createNodeField } = boundActionCreators
    const slug = node.frontmatter.root ? '/' : createFilePath({ node, getNode, basePath: `pages` })

    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  }
};
