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
              <a href={`https://www.facebook.com/sharer/sharer.php?u=https://fde-photo-log.herokuapp.com${window.location.pathname}`}>Facebook</a>
              <span> | </span>
              <a href={`https://twitter.com/home?status=https://fde-photo-log.herokuapp.com${window.location.pathname}`}>Twitter</a>
              <span> | </span>
              <a href={`mailto:info@example.com?&subject=&body=https://fde-photo-log.herokuapp.com${window.location.pathname}`}>Mail</a>
              <span> | </span>
              <a href={`whatsapp://send?text=https://fde-photo-log.herokuapp.com${window.location.pathname}`}>WhatsApp</a>
            </p>
            <ul>
              {post.camera && (
                <li>
                  <b>Camera:</b> {post.camera}
                </li>
              )}
              {post.filmStock && (
                <li>
                  <b>Film Stock:</b> {post.filmStock}
                </li>
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
