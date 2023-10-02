import React, { useContext, useEffect, useRef } from 'react'
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap'
import { PostsContext } from '../../context/PostsContext'
import PostCard from './PostCard'

const MainBlog = () => {
  const { fetch, loading, error, data, fetching, fetchNext } = useContext(PostsContext)
  const isMount = useRef(false)
  const observerRef = useRef(null)
  useEffect(() => {
    if(!isMount.current) {
      fetch()
      isMount.current = true
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      console.log(entries)
      const blogObserver = entries[0]
      if(blogObserver.isIntersecting) {
        console.log('dddd')
        fetchNext()
      }
    }, {})
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if(observerRef.current) observer.unobserve(observerRef.current);
    }
  }, [data, observerRef, fetchNext])


  return (
    <section className='py-5'>
      <h2 className='text-center mb-5'>Articles</h2>
      <Container>
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
          {data.map((post) => (
            <Col key={post.id}>
              <PostCard post={post}/>
            </Col>
          ))}
          </Row>
        ) : null}
        {fetching ? <p className='text-center'>loading...</p> : null}
        <div className="observer" ref={observerRef}></div>
      </Container>
    </section>
  )
}

export default MainBlog
