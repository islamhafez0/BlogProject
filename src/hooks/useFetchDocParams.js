import React, { useCallback, useContext, useState } from 'react'
import { FirebaseContext } from '../context/FirebaseContext'
import { collection, getDocs, query, where } from 'firebase/firestore'

const useFetchDocParams = (colName, slug) => {
  const { db } = useContext(FirebaseContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const getData = useCallback(async() => {
    setLoading(true)
    setError(null)
    try {
      const colRef = collection(db, colName)
      const q = query(colRef, where('slug', '==', slug))
      const res = await getDocs(q)
      const resData = res.docs.map(doc => {
        const docdata = doc.data()
        return {
          id: doc.id, 
          ...docdata,
          createdAt: docdata.createdAt.toDate()
        }
      })
      if(resData && resData.length) {
        setData(resData[0])
      }
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }, [])
  return {getData, error, loading, data}
}

export default useFetchDocParams
