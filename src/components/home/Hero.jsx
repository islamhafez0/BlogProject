import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'
const Hero = () => {
  const navigate = useNavigate()
  return (
    <section className='py-5 bg-light'>
      <Container>
        <Row>
          <Col className='mx-auto' sm='12' md='10' lg='8'>
            <div className="d-flex align-items-center flex-column text-center">
              <img src={logo} alt="logo" className={styles.home_logo} />
              <p className='mt-3'>
              "Welcome to CollabWriteHub - Your Source for Engaging Content. Explore a world of knowledge, from programming insights to wellness tips, as we curate a diverse range of articles to inform and inspire you. Join us on a journey of learning, discovery, and growth."
              </p>
              <div className="mt-4">
                <Button
                  size='large'
                  onClick={() => navigate('/blog/new')}
                >Add new article
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Hero
