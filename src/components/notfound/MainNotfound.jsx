import React from 'react'
import { Button, Container } from 'react-bootstrap'
import notfoundImage from '../../assets/images/not-found.png'
import styles from './Notfound.css'
import { useNavigate } from 'react-router-dom'
const MainNotfound = () => {
  const navigate = useNavigate()
  return (
    <section className='not_found'>
      <Container>
        <div className='not_found-items'>
          <img src={notfoundImage} alt="not found page" />
          <h1>Page Not Found</h1>
          <Button 
            className='px-5' 
            size='lg'
            onClick={() => navigate('/')}
          >
            Go Home
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default MainNotfound
