import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMoviesByCategory, getMoviesGenres } from "../store/action"
import CardRow from "../components/Cardrow"
import "./Home.css"
import Loading from "../components/Loading"

export default function Movies() {
    const dispatch = useDispatch()
    const moviesByCategory = useSelector((state) => state.moviesByCategory)
    const moviesGenres = useSelector((state => state.moviesGenres))
    const [page, setPage] = useState(1)
    const [category, setCategory] = useState("top_rated")
    const [loading, setLoading] = useState(true)
    function handleScroll() {
        // console.log(window.innerHeight);
        // console.log(document.documentElement.scrollTop);
        // console.log(document.documentElement.scrollHeight);
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setLoading(true)
            setPage(prev => prev + 1)
        }
    }
    
    useEffect(() => {
        
        setTimeout(()=>{
            setLoading(false)
        }, 2000)
        dispatch(getMoviesByCategory(category, page))
        dispatch(getMoviesGenres())
    }, [page])
    
    console.log(page, moviesByCategory);
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    // console.log(moviesGenres);
    return (
        <div className="main-container">
            <h1>Movies</h1>
            <div className="button-category">
                
                <ul>
                    <div className="non-genre">
                        
                    <li><button className="buttons-filter" onClick={(e) => { e.preventDefault(); setCategory("top_rated"); dispatch(getMoviesByCategory("top_rated")) }} >Top Rated</button></li>
                    <li><button className="buttons-filter" onClick={(e) => { e.preventDefault(); setCategory("upcoming"); dispatch(getMoviesByCategory("upcoming")) }} >New & Upcoming</button></li>
                    </div>
                    <li>

                        {/* <label for="genre">Select by Genre</label> */}
                        <select className="buttons-filter" onChange={(e) => { e.preventDefault(); setCategory(e.target.value); dispatch(getMoviesByCategory(e.target.value)); console.log(e.target.value); }} name="genre">
                            <option value="">Select by Genre</option>
                            {moviesGenres.genres ? moviesGenres.genres.map(el =>
                                <option value={el.id} >{el.name}</option>

                            ) : null}
                        </select>
                    </li>
                </ul>
             
            </div>
            <CardRow items={moviesByCategory.results} ></CardRow>
            <div style={{display:"flex", justifyContent:"center"}} >

            { loading &&  <Loading></Loading>}
            </div>
                                
        </div>
    )
}