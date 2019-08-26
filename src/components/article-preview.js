import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './article-preview.module.css'

export default ({ article }) => (
  <div className={styles.preview}>
    <Link to={`/blog/${article.slug}`}>
      <Img alt="" fluid={article.thumbnail.fluid} />
    </Link>
    <strong className={styles.previewTitle}>
      <Link to={`/blog/${article.slug}`}>{article.title}</Link>
    </strong>
    <small>
      By {article.author.name} on {article.publishDate}
    </small>
    <p
      className="article-description"
      dangerouslySetInnerHTML={{
        __html: article.description.childMarkdownRemark.html,
      }}
    />
    {article.tags.map(tag => (
      <Link className={styles.tag} key={tag} to={`/tags/${tag}`}>
        {tag}
      </Link>
    ))}
  </div>
)
