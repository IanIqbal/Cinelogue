import { useDispatch, useSelector } from "react-redux"
import { getPopularMovie, getPopularSeries } from "../store/action"
import { useEffect } from "react"
import CardRow from "../components/Cardrow"
import "./Home.css"
export default function Home() {
    const dispatch = useDispatch()

    const popularMovies = useSelector((state) => state.popularMovies)
    const popularSeries = useSelector((state) => state.popularSeries)
    useEffect(() => {
        dispatch(getPopularMovie())
        dispatch(getPopularSeries())

        // const script = document.createElement('script');

        // if (
        //     navigator.userAgent.indexOf("AlipayClient") > -1 ||
        //     navigator.userAgent.indexOf("mPaaSClient") > -1
        // ) {

        //     script.src = "https://appx/web-view.min.js";
        //     script.type = "text/javascript";
        //     script.async = true;
        //     document.head.appendChild(script);
        // }

        // return () => {
        //     document.head.removeChild(script);
        // };
        if (
            navigator.userAgent.indexOf("AlipayClient") > -1 ||
            navigator.userAgent.indexOf("mPaaSClient") > -1
        ) {
            window.my.postMessage({message:"request location"})

            window.my.onMessage = function(e){
                console.log(e, "<<<<<<< dari mpaas")
            }
        }

    }, [])

    console.log(popularMovies);
    console.log(popularSeries);
    const toMpaas = () => {
        
        if (
            navigator.userAgent.indexOf("AlipayClient") > -1 ||
            navigator.userAgent.indexOf("mPaaSClient") > -1
        ) {
            let test = { payload: popularMovies.results[0] }

            window.my.navigateTo({ url: "/pages/adit/home/home?message=" + encodeURIComponent(JSON.stringify(test)) })
        }
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