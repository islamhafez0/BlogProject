import React, { useContext } from 'react'
import styles from './Header.module.css'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { AuthContext } from '../../context/AuthContext'

const NavigationLink = ({ slug, end, title, children }) => {
  return <Nav.Link as='li'>
    <NavLink to={slug} end={!!end} className={styles['navLink']}>
      {title} {children}
    </NavLink>
  </Nav.Link>
}

const Header = () => {
  const { isAuth, logout } = useContext(AuthContext)
  return (
    <header className={styles.header}>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container className='p-relative'>
          <Navbar.Brand as='span'>
          <NavigationLink slug='/'>
            <img src={logo} alt="blog logo" />
          </NavigationLink>
          </Navbar.Brand>
          <Nav className="ms-auto">
            <NavigationLink title='Home' slug='/' end />
            <NavigationLink title='Blog' slug='/blog' end />
            {isAuth ? (
              <>
                <NavigationLink title='Add Article' slug='/blog/new' end />
                <Button className='ms-1 bg-danger border-danger' onClick={logout}>
                  logout
                </Button>
              </>
            ) : (
              <>
                <NavigationLink title='Login' slug='/login' end />
                <NavigationLink title='signup' slug='/signup' end />
              </>
            ) }
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
