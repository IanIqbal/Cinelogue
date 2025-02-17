import { useDispatch, useSelector } from "react-redux"
import { getPopularMovie, getPopularSeries } from "../store/action"
import { useEffect } from "react"
import CardRow from "../components/Cardrow"
import "./Home.css"
import LoadingDetail from "../components/LoadingDetail";

export default function Home() {
    const dispatch = useDispatch()

    const popularMovies = useSelector((sliceState) => sliceState.mainSlice.popularMovies)
    const popularSeries = useSelector((sliceState) => sliceState.mainSlice.popularSeries)
    useEffect(() => {                
            dispatch(getPopularMovie())
            dispatch(getPopularSeries())
    }, [])
    return (
        <>

            <div className="main-container">
                <h1>Popular Movies</h1>
                {popularMovies.results?.length?<CardRow items={popularMovies.results} ></CardRow> : 
                    <div className="loading-container"  >
                    <LoadingDetail></LoadingDetail>
                    </div>
                }
                <h1>Popular Series</h1>
                {popularSeries.results?.length? <CardRow items={popularSeries.results} ></CardRow> :
                 <div className="loading-container"  >
                 <LoadingDetail></LoadingDetail>
                 </div>
               }
                

            </div>
        </>
    )
}