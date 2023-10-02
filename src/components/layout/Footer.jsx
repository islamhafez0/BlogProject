import React from 'react'
import styles from './Footer.module.css'
const date = new Date().getFullYear()
const Footer = () => {
  return (
    <div className={`bg-dark ${styles.footer}`}>
      <p>
        &#169; Islam Hafez {date} 
      </p>
    </div>
  )
}

export default Footer
