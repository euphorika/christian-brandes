const path = require("path");
const crypto = require("crypto")
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
              category
              title
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

exports.onCreateNode = ({ node, getNode, getNodes, boundActionCreators }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const { createNodeField, createNode } = boundActionCreators
    const slug = node.frontmatter.root ? '/' : createFilePath({ node, getNode, basePath: `pages` })

    createNodeField({
      node,
      name: `slug`,
      value: slug
    })

    if (node.frontmatter.root) {
      const sticky = getNodes().filter(node2 => node2.internal.type === 'MarkdownRemark' && node2.frontmatter.title === node.frontmatter.sticky)
      let teasers = []

      node.frontmatter.row.forEach(row => {
        let cols = []

        row.teasers.forEach(teaserTitle => {
          const teaser = getNodes().filter(node2 => node2.internal.type === 'MarkdownRemark' && node2.frontmatter.title === teaserTitle.teaser)
          cols.push(teaser[0].frontmatter)
        })

        teasers.push(cols)
      })

      const fieldData = {
        sticky: sticky[0].frontmatter,
        teasers: teasers,
      }

      createNode({
        ...fieldData,
        id: 'relatedposts',
        parent: sticky[0].id,
        children: [],
        internal: {
          type: 'cmsGeneratedPosts',
          contentDigest: crypto.createHash(`md5`).update(JSON.stringify(fieldData)).digest(`hex`),
          content: JSON.stringify(fieldData),
          description: `Generetad posts from Netlify CMS relation fields`
        }
      })

    }

  }

}
