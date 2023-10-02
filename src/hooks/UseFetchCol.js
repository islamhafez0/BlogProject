import React, { useCallback, useState } from 'react'
import { useContext } from 'react'
import { FirebaseContext } from '../context/FirebaseContext'
import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore'
const UseFetchCol = (collectionName) => {

  const { db } = useContext(FirebaseContext)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetchig] = useState(false)
  const [error, setError] = useState()
  const [data, setData] = useState()
  const [lastDoc, setLastDoc] = useState(null)
  const getData = useCallback(async () => {
    setLoading(true)
    try{
      const cloRef = collection(db, collectionName)
      const q = query(cloRef, orderBy('createdAt', 'desc'), limit(8))
      const res = await getDocs(q)
      console.log(res)

      const resData = res.docs.map(doc => {
        const docData = doc.data()
        return {
          id: doc.id,
          ...docData,
          createdAt: docData.createdAt.toDate()
        }
      })
      setData(resData)
      setLastDoc(res.docs[res.docs.length - 1])
    }catch(error) {
      setError(error.message)
    }
    setLoading(false)
  }, [])

  const getNextData = useCallback(async (lastVisible) => {
    setFetchig(true)
    try{
      const cloRef = collection(db, collectionName)
      const q = query(cloRef, orderBy('createdAt', 'desc'), limit(8),
      startAfter(lastVisible))
      const res = await getDocs(q)
      console.log(res)

      const resData = res.docs.map(doc => {
        const docData = doc.data()
        return {
          id: doc.id,
          ...docData,
          createdAt: docData.createdAt.toDate()
        }
      })
      setData(data => [...data, ...resData])
      setLastDoc(res.docs[res.docs.length - 1])
    }catch(error) {
      setError(error.message)
    }
    setFetchig(false)
  }, [])

  return { loading, error, data, getData, lastDoc, getNextData, fetching }
}

export default UseFetchCol
