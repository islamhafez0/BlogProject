import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Notfound from '../pages/Notfound'
import DefaultLayout from '../layouts/DefaultLayout'
import Blog from '../pages/blog/Blog'
import NewPost from '../pages/blog/NewPost'
import Articles from '../pages/blog/Articles'
import AuthLayout from '../layouts/AuthLayout'
import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'
import { AuthContext } from '../context/AuthContext'
const MainRouter = () => {

  const { isAuth } = useContext(AuthContext)
  return (
    <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path='*'  element={<Notfound />}/>
        </Route>

        <Route path='/blog' element={<DefaultLayout />}>
          <Route index element={<Blog />} />
          {isAuth ? (
            <Route path='new' element={<NewPost />}/>
          ) : (
            <Route path='new' element={<Navigate to='/login' />}/>
          )}
          
          <Route path=':slug' element={<Articles />}/>
        </Route>


        <Route path='/' element={<AuthLayout />}>
          {!isAuth ? (
            <Route path='login' element={<Login />}/>
          ): (
            <Route path='login' element={<Navigate to='/' replace />}/>
          )}
          {!isAuth ? (
            <Route path='signup' element={<Signup />}/>
          ) : (
            <Route path='signup' element={<Navigate to='/' />}/>
          )}
        </Route>

    </Routes>
  )
}

export default MainRouter
