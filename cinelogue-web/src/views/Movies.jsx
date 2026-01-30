import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMoviesByCategory, getMoviesGenres } from "../store/action"
import CardRow from "../components/Cardrow"
import "./Home.css"
import Loading from "../components/Loading"

export default function Movies() {
    const dispatch = useDispatch()
    const moviesByCategory = useSelector((state) => state.mainSlice.moviesByCategory)
    const moviesGenres = useSelector((state => state.mainSlice.moviesGenres))
    const [page, setPage] = useState(1)
    const [category, setCategory] = useState("top_rated")
    const [loading, setLoading] = useState(true)
    function handleScroll() {       
        if (!loading && (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight)) {
            setLoading(true)
            setPage(prev => prev + 1)
        }
    }
    
    useEffect(() => {
        
        setTimeout(()=>{
            setLoading(false)
        }, 2000)
        dispatch(getMoviesByCategory(category, page))
    }, [page])
    useEffect(()=>{
        
         window.addEventListener('scroll', handleScroll);
         return () => window.removeEventListener('scroll', handleScroll);
    }, [loading])
    useEffect(() => {
        dispatch(getMoviesGenres())
        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    return (
        <div className="main-container">
            <div className="button-category">
                
                <ul>
                    <div className="non-genre">
                        
                    <li><button className="buttons-filter" onClick={(e) => { e.preventDefault(); setCategory("top_rated"); dispatch(getMoviesByCategory("top_rated")) }} >Top Rated</button></li>
                    <li><button className="buttons-filter" onClick={(e) => { e.preventDefault(); setCategory("upcoming"); dispatch(getMoviesByCategory("upcoming")) }} >Upcoming</button></li>
                    </div>
                    <li>

                        <select className="buttons-filter" onChange={(e) => { e.preventDefault(); setCategory(e.target.value); dispatch(getMoviesByCategory(e.target.value));}} name="genre">
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