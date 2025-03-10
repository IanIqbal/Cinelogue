import LottieReact from "lottie-react"
import animationData from "../animations/loading-detail-film.json"
import { useEffect, useRef } from "react"
import "./LoadingDetail.css"

export default function LoadingDetail(){
    const animationRef = useRef()
    useEffect(()=>{
        if(animationRef.current){
            animationRef.current.setSpeed(4)
        }
    },[])
    return (
        <div style={{height:400, width:400}}>

        <LottieReact className="roll-in-blurred-left" lottieRef={animationRef}   autoPlay animationData={animationData}>

        </LottieReact>
        </div>
    )
}