import { createContext, useCallback } from "react";
import UseFetchCol from "../hooks/UseFetchCol";

export const PostsContext = createContext()

export const PostsProvider = ({ children }) => {
    const {data, getData, getNextData, loading, error, fetching, lastDoc} = UseFetchCol('posts')
    const fetch = useCallback(() => {
        if(!data) {
            getData()
        }
    }, [data, getData])

    const fetchNext = useCallback(() => {
        if(data && !loading && !fetching && lastDoc) {
            getNextData(lastDoc)
        }
    }, [data, getNextData, loading, fetching, lastDoc])

    const reFetch = getData
    return <PostsContext.Provider value={{ fetch, loading, error, data, fetchNext, fetching,
    reFetch }}>
        {children}
    </PostsContext.Provider>
}