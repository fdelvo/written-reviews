const Promise = require('bluebird')
const path = require('path')
const _ = require('lodash')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const tagComponent = path.resolve('./src/templates/tag.js')
    const authorComponent = path.resolve('./src/templates/author.js')
    const indexComponent = path.resolve('./src/templates/index.js')
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
                    slug
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
        const postsPerPage = 12
        const numPagesPosts = Math.ceil(posts.length / postsPerPage)

        Array.from({ length: numPagesPosts }).forEach((_, i) => {
          createPage({
            path: i === 0 ? `/` : `/${i + 1}`,
            component: indexComponent,
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPagesPosts,
              currentPage: i + 1,
            },
          })
        })

        posts.forEach(post => {
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
          const tagPosts = posts.filter(
            post => post.node.tags.indexOf(tag) !== -1
          )
          const numPagesPostsTags = Math.ceil(tagPosts.length / postsPerPage)
          Array.from({ length: numPagesPostsTags }).forEach((_, i) => {
            createPage({
              path: i === 0 ? `/tags/${tag}/` : `/tags/${tag}/${i + 1}`,
              component: tagComponent,
              context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPagesPostsTags,
                currentPage: i + 1,
                tag,
              },
            })
          })
        })

        let authors = []
        _.each(posts, edge => {
          if (_.get(edge, 'node.author.slug')) {
            authors.push({'slug': edge.node.author.slug, 'name': edge.node.author.name})
          }
        })
        authors = _.uniq(authors)
        authors.forEach(author => {
          const authorPosts = posts.filter(
            post => post.node.author.slug === author.slug
          )
          const numPagesPostsAuthors = Math.ceil(
            authorPosts.length / postsPerPage
          )
          Array.from({ length: numPagesPostsAuthors }).forEach((_, i) => {
            createPage({
              path:
                i === 0 ? `/authors/${author.slug}/` : `/authors/${author.slug}/${i + 1}`,
              component: authorComponent,
              context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPagesPostsAuthors,
                currentPage: i + 1,
                authorName: author.name,
                authorSlug: author.slug,
              },
            })
          })
        })
      })
    )
  })
}
