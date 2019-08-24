import React from 'react'
import { Link } from 'gatsby'
import styles from './pagination.module.css'

export default ({ isFirst, isLast, prevPage, nextPage, numPages, to }) => (
  <div style={{marginTop: "1em"}}>
    {!isFirst && (
      <Link to={prevPage} rel="prev" className={styles.paginationLink}>
        ← Previous Page
      </Link>
    )}
    {Array.from({ length: numPages }, (_, i) => (
      <Link
        key={`pagination-number${i + 1}`}
        to={`${to}${i === 0 ? '' : i + 1}`}
        className={styles.paginationLink}
      >
        {i + 1}
      </Link>
    ))}
    {!isLast && (
      <Link to={nextPage} rel="next">
        Next Page →
      </Link>
    )}
  </div>
)
