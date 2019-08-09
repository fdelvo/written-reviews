import React from 'react'
import Img from 'gatsby-image'

import styles from './hero.module.css'

export default ({ data }) => (
  <div className={styles.hero}>
    <Img className={styles.heroImage} alt={data.name} fluid={data.image.fluid} />
    <div className={styles.heroDetails}>
      <h3 className={styles.heroHeadline}>{data.name}</h3>
      <p className={styles.heroTitle}>{data.title}</p>
      <ul>
        <li>Twitter: <a href={`https://www.twitter.com/${data.twitter}`}>{data.twitter}</a></li>
        <li>Email: {data.email}</li>
      </ul>
      <p className={styles.heroShortBio}>{data.shortBio.shortBio}</p>
    </div>
  </div>
)
