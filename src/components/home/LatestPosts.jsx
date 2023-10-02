import React, { useContext, useEffect, useRef } from 'react'
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PostsContext } from '../../context/PostsContext'
import PostCard from '../blog/PostCard'

const LatestPosts = () => {
  const navigate = useNavigate()
  const { fetch, loading, error, data } = useContext(PostsContext)
  const isMount = useRef(false)
  useEffect(() => {
    if(!isMount.current) {
      fetch()
      isMount.current = true
    }
  }, [])
  return (
    <section className='my-5'>
      <Container>
        <h2 className="text-center mb-5">Latest Articles</h2>
        <div className="text-center">
          {loading ? (
            <Spinner animation='border' status='role'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          ) : null}
        </div>
        {error ? (
        <div>
          <Alert variant='danger'>{ error } </Alert>
        </div>
        ): null}
        {(!error || !loading) && data ? (
        <Row xs='1' md='2' lg='4' className='g-4'>
          {data.slice(0, 4).map((post) => (
            <Col key={post.id}>
              <PostCard post={post}/>
            </Col>
          ))}
        </Row>
        ) : null}
        <div className="mt-4 text-center">
          <Button 
            className='px-5'
            variant='outline-dark'
            onClick={() => navigate('/blog')}
          >
            See All
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default LatestPosts
