import React from 'react'
import { Link } from 'gatsby'
import styles from './navigation.module.css'
import logo from "../static/Tilted Flo At Logo.png"

export default () => (
  <nav role="navigation">
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link to="/">
          <img className={styles.navLogo} src={logo} />
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
