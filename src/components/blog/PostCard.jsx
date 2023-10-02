import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './postcard.module.css'
const getDate = (d) => {
  const date = new Date(d)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${day}/${month}/${year}`
}
const PostCard = ({ post }) => {
  return (
    <Link to={`/blog/${post.slug}`} className={styles.card_link}>
      <Card>
      <div className={styles.postcard_img}>
        <Card.Img variant="top" src={post.image} />
        <div className={styles.postcard_img_info}>
          <small>user: {post.user}</small>
          <small>{getDate(post.createdAt)}</small>
      </div>
      </div>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.excert}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default PostCard
