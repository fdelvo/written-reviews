import React from 'react'
import { graphql, Link } from 'gatsby'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import styles from '../components/article-preview.module.css'

import heroStyles from './blog-post.module.css'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost')
    const { location } = this.props

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <img
            className={heroStyles.coverImage}
            src={post.heroImage.file.url}
          />
          <div className="wrapper postWrapper">
            <h1 className="section-headline">{post.title}</h1>
            <p
              style={{
                display: 'block',
                fontStyle: 'italic',
                marginBottom: '3em',
              }}
            >
              By {post.author.name} on {post.publishDate}
              <span> | </span>
              <span>Share: </span>
              <a
                class="resp-sharing-button__link"
                href={`https://twitter.com/intent/tweet/?text=${post.description.description}%20${location.href}`}
                target="_blank"
                rel="noopener"
                aria-label="Twitter"
              >
                Twitter
              </a>
              <span> | </span>
              <a
                class="resp-sharing-button__link"
                href={`https://reddit.com/submit/?url=https%3A%2F%2Fwww%2Enerdy%2Dgamers%2Ecom%2Fblog%2Fpost${post.slug}&amp;resubmit=true&amp;title=test`}
                target="_blank"
                rel="noopener"
                aria-label="Reddit"
              >
                Reddit
              </a>
              <span> | </span>
              <a
                class="resp-sharing-button__link"
                href="whatsapp://send?text=Visit%20Nerdy%20Gamers%20MTG%20https%3A%2F%2Fwww.nerdy-gamers.com"
                target="_blank"
                rel="noopener"
                aria-label="WhatsApp"
              >
                WhatsApp
              </a>
            </p>
            <ul>
              {post.camera && (
                <li><b>Camera:</b> {post.camera}</li>
              )}
              {post.filmStock && (
                <li><b>Film Stock:</b> {post.filmStock}</li>
              )}
            </ul>
            {post.body !== null && (
              <div
                dangerouslySetInnerHTML={{
                  __html: post.body.childMarkdownRemark.html,
                }}
              />
            )}
            {post.tags.map(tag => (
              <Link className={styles.tag} key={tag} to={`/tags/${tag}`}>
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      tags
      publishDate(formatString: "MMMM Do, YYYY")
      camera
      filmStock
      description {
        description
      }
      heroImage {
        file {
          url
        }
      }
      author {
        name
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
