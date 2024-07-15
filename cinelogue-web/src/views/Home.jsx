import { useDispatch, useSelector } from "react-redux"
import { getPopularMovie, getPopularSeries } from "../store/action"
import { useEffect } from "react"
import CardRow from "../components/Cardrow"
import "./Home.css"
import { Helmet } from "react-helmet"
export default function Home() {
    const dispatch = useDispatch()

    const popularMovies = useSelector((state) => state.popularMovies)
    const popularSeries = useSelector((state) => state.popularSeries)
    useEffect(() => {
        dispatch(getPopularMovie())
        dispatch(getPopularSeries())

        // const script = document.createElement('script');
        // script.src = "https://appx/web-view.min.js";
        // script.type = "text/javascript";
        // script.async = true;
        // document.body.appendChild(script);

        // return () => {
        //     document.body.removeChild(script);
        // };


    }, [])

    console.log(popularMovies);
    console.log(popularSeries);
    const toMpaas = () => {
        my.navigateTo({ url: "/pages/adit/home/home" })
    }
    return (
        <>
            {/* <Helmet>
                <script type="text/javascript" src="https://appx/web-view.min.js"></script>

            </Helmet> */}
            <div className="main-container">
                <h1>Popular Movies</h1>
                <button onClick={toMpaas}>To Mpaas</button>
                <CardRow items={popularMovies.results} ></CardRow>
                <h1>Popular Series</h1>
                <CardRow items={popularSeries.results} ></CardRow>
            </div>
        </>
    )
}