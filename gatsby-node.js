const Promise = require('bluebird')
const path = require('path')
const _ = require("lodash")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const tagComponent = path.resolve('./src/templates/tag.js')
    const authorComponent = path.resolve('./src/templates/author.js')
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                  tags
                  author {
                    name
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
 
        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach((post, index) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug,
            },
          })
        })

        let tags = []
        // Iterate through each post, putting all found tags into `tags`
        _.each(posts, edge => {
          if (_.get(edge, 'node.tags')) {
            tags = tags.concat(edge.node.tags)
          }
        })
        // Eliminate duplicate tags
        tags = _.uniq(tags)

        tags.forEach(tag => {
          createPage({
            path: `/tags/${tag}/`,
            component: tagComponent,
            context: {
              tag,
            },
          })
        })

        let authors = []
        // Iterate through each post, putting all found tags into `tags`
        _.each(posts, edge => {
          if (_.get(edge, 'node.author.name')) {
            authors = authors.concat(edge.node.author.name)
          }
        })
        // Eliminate duplicate tags
        authors = _.uniq(authors)

        authors.forEach(author => {
          createPage({
            path: `/authors/${author}/`,
            component: authorComponent,
            context: {
              author,
            },
          })
        })
      })
    )
  })
}
