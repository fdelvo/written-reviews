import React from 'react'
import { Link } from 'gatsby'
import styles from './navigation.module.css'
import logo from "../static/1.png"

export default () => (
  <nav role="navigation">
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link to="/">
          <img width={200} src={logo} />
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
