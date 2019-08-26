import React from 'react'
import { Link } from 'gatsby'
import styles from './navigation.module.css'

export default () => (
  <nav role="navigation">
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link to="/">
          <h1 className={styles.headline}>written reviews</h1>
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/tags/">Tags</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/authors/">Authors</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/about/">About</Link>
      </li>
    </ul>
  </nav>
)
