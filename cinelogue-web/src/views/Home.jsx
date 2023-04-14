import { useDispatch, useSelector } from "react-redux"
import { getPopularMovie, getPopularSeries } from "../store/action"
import { useEffect } from "react"
import CardRow from "../components/Cardrow"
import "./Home.css"

export default function Home(){
    const dispatch = useDispatch()

    const popularMovies = useSelector((state)=> state.popularMovies )
    const popularSeries = useSelector((state)=> state.popularSeries)
    useEffect(()=>{
        dispatch(getPopularMovie())
        dispatch(getPopularSeries())
    }, [])

    console.log(popularMovies);
    console.log(popularSeries);
    return(
        <div  className="main-container">
        <h1>Popular Movies</h1>
        <CardRow items={popularMovies.results} ></CardRow>
        <h1>Popular Series</h1>
        <CardRow items={popularSeries.results} ></CardRow>
        </div>
    )
}