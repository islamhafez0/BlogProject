import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import useFetchDocParams from '../../hooks/useFetchDocParams'
import { Alert } from 'bootstrap'
import { Card, Container, Row } from 'react-bootstrap'
import styles from './Article.module.css'
const getDate = (d) => {
  const date = new Date(d)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${day}/${month}/${year}`
}

const MainArticles = () => {
  const params = useParams()
  const { getData, data, loading, error } = useFetchDocParams('posts', params.slug)
  const isMount = useRef(null)
  useEffect(() => {
    if(!isMount.current) {
      getData()
      isMount.current = true
    }
  }, [])
  if(loading) return <p className='text-center'>loading ...</p>
  if(error) return <Alert variant='danger'>{error}</Alert>
  if(!data) return null
  console.log(data)
  return (
    <article>
      <div className={styles.article_hero}>
        <img src={data.image} alt={data.title} />
      </div>
      <Container>
        <Row>
          <Card>
            <Card.Body>
              <Card.Title>{data.title}</Card.Title>
              <Card.Subtitle className='mt-2 text-mute'>
                <small className='d-block'>By: {data.user}</small>
                <small>Date: {getDate(data.createdAt)}</small>
              </Card.Subtitle>
              <div className="mt-5" dangerouslySetInnerHTML={
                {__html: data.body}
              }>
              </div>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </article>
  )
}

export default MainArticles
