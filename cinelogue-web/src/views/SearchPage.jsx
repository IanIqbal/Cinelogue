import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  getSearchResult } from "../store/action"
import CardRow from "../components/Cardrow"
import "./Home.css"
import Loading from "../components/Loading"
import { useSearchParams } from "react-router-dom"

export default function SearchPage() {
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const searchResult = useSelector((state) => state.mainSlice.searchResult)
    const [searchParams, setSearchParams] = useSearchParams()
    const isSearchLoading = useSelector((state) => state.mainSlice.isSearchLoading)
    function handleScroll() {
            if ( !isSearchLoading && window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                setPage(prev => prev + 1)
            }
    }

    useEffect(()=>{
        setPage(1)
    },[searchParams.get("query")])

  useEffect(()=>{
     window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
  },[isSearchLoading])
    useEffect(() => {        
        dispatch(getSearchResult(searchParams.get("query"), page))
    }, [page])
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="main-container">
            <h1>Search</h1>

            <CardRow items={searchResult.results} ></CardRow>
            <div style={{ display: "flex", justifyContent: "center" }} >

                {isSearchLoading && searchResult.page < searchResult.total_pages &&  <Loading></Loading>}
                {searchResult.results && searchResult.results.length > 0 &&searchResult.page >= searchResult.total_pages && searchParams.get("query") &&<h3>All data for "{searchParams.get("query")}" has been displayed</h3>}
            </div>
        </div>
    )
}