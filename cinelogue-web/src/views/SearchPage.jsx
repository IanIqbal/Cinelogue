import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMoviesByCategory, getMoviesGenres, getSearchResult } from "../store/action"
import CardRow from "../components/Cardrow"
import "./Home.css"
import Loading from "../components/Loading"
import { useSearchParams } from "react-router-dom"

export default function SearchPage() {
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const searchResult = useSelector((state) => state.mainSlice.searchResult)
    const [searchParams, setSearchParams] = useSearchParams()
    function handleScroll() {
            if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                setLoading(true)
                setPage(prev => prev + 1)
            }
    }

    useEffect(()=>{
        setPage(1)
    },[searchParams.get("query")])
    useEffect(() => {

        setTimeout(() => {
            setLoading(false)
        }, 3000)

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

                {loading && searchResult.page < searchResult.total_pages &&  <Loading></Loading>}
                {searchResult.page >= searchResult.total_pages && searchParams.get("query") &&<h3>All data for "{searchParams.get("query")}" has been displayed</h3>}
            </div>
        </div>
    )
}