import React from 'react'
import { PostsProvider } from './PostsContext'
import { FirebaseProvider } from './FirebaseContext'
import { AuthProvider } from './AuthContext'
const ContextProvider = ({ children }) => {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <PostsProvider>
          { children }
        </PostsProvider>
      </AuthProvider>

    </FirebaseProvider>
  )
}

export default ContextProvider
