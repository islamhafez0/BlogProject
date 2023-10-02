import { createContext, useContext, useEffect, useState } from 'react'
import { FirebaseContext } from './FirebaseContext'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged, signOut } from 'firebase/auth'
export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)
    const { app } = useContext(FirebaseContext)
    const auth = getAuth(app)



    useEffect(() => {
        let unsubscribe = () => {}
            unsubscribe = onAuthStateChanged(auth, (user) => {
                console.log('user', user)
                setUser(user)
            })
        return () => {
            unsubscribe()
        }
    }, [auth])

    const signup = async ({ email, password }) => {
        try {
            const creds = await createUserWithEmailAndPassword(auth, email, password)
            console.log('creads', creds)
            setError(null)
        } catch (error) {
            setError(error)
        }
    } 

    const login = async ({ email, password }) => {
        try {
            const creds = await signInWithEmailAndPassword(auth, email, password)
            console.log('creads', creds)
            setError(null)
        } catch (error) {
            setError(error)
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
            setError(null)
        } catch (error) {
            setError(null)
        }
    }
    return <AuthContext.Provider value={{ signup, login, user, isAuth: !!user, logout, error }}>
        {children}
    </AuthContext.Provider>
}