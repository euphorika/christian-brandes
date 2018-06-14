const path = require("path");
const crypto = require("crypto")
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return graphql(`
    {
      cmsGeneratedPosts {
        sticky {
          thumbnail
        }
        teasers {
          cols {
            thumbnail
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
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const postTemplatePath = `src/templates/postTemplate.js`
      const indexTemplatePath = `src/templates/indexTemplate.js`

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
      } else {
        const { cmsGeneratedPosts } = result.data
        const { sticky } = cmsGeneratedPosts
        const { teasers } = cmsGeneratedPosts
        const thumbnail = "/" + sticky.thumbnail + "/"

        let teaserThumbnails = []

        teasers.forEach(teaser => {
          teaser.cols.forEach(col => {
            teaserThumbnails.push(col.thumbnail)
          })
        })

        createPage({
          path: node.fields.slug,
          component: path.resolve(indexTemplatePath),
          context: {
            thumbnail: thumbnail,
            teasers: "/(" + teaserThumbnails.join('|') + ")/"
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
      const sticky = getNodes().find(node2 => node2.internal.type === 'MarkdownRemark' && node2.frontmatter.title === node.frontmatter.sticky)
      let teasers = []

      node.frontmatter.row.forEach(row => {
        let cols = []

        row.teasers.forEach(teaser => {
          let node = getNodes().find(node2 => node2.internal.type === 'MarkdownRemark' && node2.frontmatter.title === teaser.teaser)
          let col = node.frontmatter

          col.slug = node.fields.slug
          col.marginTop = teaser.verticalPosition ? teaser.verticalPosition : '0'
          col.width = teaser.width ? teaser.width / 100 : 1
          col.paddingLeft = teaser.indentLeft ? teaser.indentLeft : '0'
          col.paddingRight = teaser.indentRight ? teaser.indentRight : '0'

          cols.push(col)
        })

        teasers.push({
          marginTop: row.verticalPosition ? row.verticalPosition : '0',
          cols: cols
        })

      })

      const fieldData = {
        sticky: {
          ...sticky.frontmatter,
          slug: sticky.fields.slug
        },
        teasers: teasers,
      }

      createNode({
        ...fieldData,
        id: 'relatedposts',
        parent: sticky.id,
        children: [],
        internal: {
          type: 'cmsGeneratedPosts',
          contentDigest: crypto.createHash(`md5`).update(JSON.stringify(fieldData)).digest(`hex`),
          content: JSON.stringify(fieldData),
          description: `Generetad posts from Netlify CMS relation fields`
        },
      })

    }

  }

}
