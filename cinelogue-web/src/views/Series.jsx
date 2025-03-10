import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSeriesGenres, getSeriesByCategory } from "../store/action"
import CardRow from "../components/Cardrow"
import "./Home.css"
import Loading from "../components/Loading"
import { incrementSeriesPage } from "../store/slice"

export default function Series() {
    const dispatch = useDispatch()
    const seriesByCategory = useSelector((state) => state.mainSlice.seriesByCategory)
    const seriesGenres = useSelector((state => state.mainSlice.seriesGenres))
    const page = useSelector((state) => state.mainSlice.currentSeriesPage)
    const [category, setCategory] = useState("top_rated")
    const [loading, setLoading] = useState(true)
    function handleScroll() {   
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.documentElement.scrollHeight) {
            setLoading(true)
            dispatch(incrementSeriesPage())
        }
    }

    useEffect(() => {
        setTimeout(()=>{
            setLoading(false)
        }, 2000)

        dispatch(getSeriesByCategory(category, page))
        dispatch(getSeriesGenres())
    }, [page])

    useEffect(() => {
        document.addEventListener("scroll", handleScroll)
        
        return () => document.removeEventListener("scroll", handleScroll)
    }, [])
    return (
        <div className="main-container">
            <h1>Series</h1>
            <div className="button-category">
                <ul>
                    <div className="non-genre" >

                    <li><button className="buttons-filter"  onClick={(e) => { e.preventDefault(); setCategory("top_rated"); dispatch(getSeriesByCategory("top_rated")) }} >Top Rated</button></li>
                    <li><button className="buttons-filter"  onClick={(e) => { e.preventDefault(); setCategory("on_the_air"); dispatch(getSeriesByCategory("on_the_air")) }} >New & Upcoming Episode</button></li>
                    </div>
                    <li>

                        <select className="buttons-filter"  onChange={(e) => { e.preventDefault(); setCategory(e.target.value); dispatch(getSeriesByCategory(e.target.value));  }} name="genre">
                        <option value="">Select by Genre</option>
                            
                            {seriesGenres.genres ? seriesGenres.genres.map(el =>
                                <option value={el.id} >{el.name}</option>

                            ) : null}
                        </select>
                    </li>
                </ul>

            </div>
            <CardRow items={seriesByCategory.results} ></CardRow>
            <div style={{ display: "flex", justifyContent: "center" }} >

                {loading && <Loading></Loading>}
            </div>
        </div>
    )
}