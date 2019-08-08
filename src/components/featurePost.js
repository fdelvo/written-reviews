import React from 'react'
import Img from 'gatsby-image'
import { Link } from "gatsby"

import styles from './hero.module.css'

export default ({ data }) => (
  <div className={styles.hero}>
    <Img
      className={styles.heroImage}
      alt={data.name}
      fluid={data.coverImage.fluid}
    />
    <div className={styles.heroDetails}>
      <h3 className={styles.heroHeadline}>
        <Link to={`/blog/${data.slug}`}>{data.title}</Link>
      </h3>
      <p className={styles.heroTitle}>By {data.author.name}</p>
    </div>
  </div>
)
