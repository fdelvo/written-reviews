import React from 'react'
import Img from 'gatsby-image'
import { Link } from "gatsby"

import styles from './hero.module.css'

export default ({ data }) => (
  <div className={styles.hero}>
    <Img
      className={styles.heroImage}
      alt={data.name}
      fluid={data.image.fluid}
    />
    <div className={styles.heroDetails}>
      <h3 className={styles.heroHeadline}>
        <Link to={`/authors/${data.slug}`}>{data.name}</Link>
      </h3>
      <p className={styles.heroTitle}>{data.title}</p>
      <ul>
        <li>
          Twitter:{' '}
          <a href={`https://www.twitter.com/${data.twitter}`}>{data.twitter}</a>
        </li>
        <li>Email: <a href={`mailto:${data.email}`}>{data.email}</a></li>
      </ul>
    </div>
  </div>
)
