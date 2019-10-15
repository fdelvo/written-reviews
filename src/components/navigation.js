import React from 'react'
import { Link } from 'gatsby'
import styles from './navigation.module.css'

export default () => (
  <nav role="navigation">
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link to="/">
          <h1 className={styles.headline}>fde-photo-log</h1>
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/tags/">Tags</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/contact/">Contact</Link>
      </li>
    </ul>
  </nav>
)
