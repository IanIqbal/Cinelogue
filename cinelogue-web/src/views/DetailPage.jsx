import { useEffect } from "react";
import { getMovieDetailCredits } from "../store/action";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./DetailPage.css"
import defaultPerson from "../images/default-person.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { emptyMovieDetail } from "../store/slice";
import LoadingDetail from "../components/LoadingDetail";

export default function DetailPage() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const item = useSelector((state)=> state.mainSlice.moviesDetail)
    useEffect(() => {
            
            dispatch(getMovieDetailCredits(id))

        return () => {
            dispatch(emptyMovieDetail())
        }
    }, [])
    return (
        <div className="detail-page">
            {!item.detail && (
                <div className="loading-container"  >
                <LoadingDetail></LoadingDetail>
                </div>
            )}
            {item.detail && (
                <>
                    <div className="detail-main"  >
                        <div className="detail-background" style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original/${item.detail.poster_path}")` }}>

                        </div>
                        <div className="detail-upper">
                            <h1>{item.detail.original_title} ({item.detail.release_date.substr(0, 4)})</h1>
                            <div className="detail-score" > 
                           
                                <h3>
                                    <FontAwesomeIcon icon={faStar} ></FontAwesomeIcon>  
                                     {item.detail.vote_average.toString().substr(0,3)}
                                </h3>
                                <p>
                                    Total Vote: {new Intl.NumberFormat().format(item.detail.vote_count)}
                                </p>
                            </div>
                        </div>
                        <div className="detail-page-header">
                            <img src={`https://image.tmdb.org/t/p/original/${item.detail.poster_path}`} alt={item.detail.original_title} />
                        </div>
                        <div className="detail-page-summary">
                            <div className="detail-page-header-info">
                                {item.detail.genres.map(genre => (
                                    <li key={genre.id} >{genre.name}</li>
                                ))}


                            </div>
                            <p>{item.detail.overview}</p>
                        </div>
                    </div>

                    <div className="detail-additional" >
                        <h2>Additional Info</h2>
                        <h4>Tagline: <span>"{item.detail.tagline? item.detail.tagline: "N/A"}"</span></h4>
                        <h4>Duration: <span>{item.detail.runtime? `${item.detail.runtime} minutes`: "N/A"}</span></h4>
                        <h4>Status: <span>"{item.detail.status}"</span></h4>
                        <h4>Release Date: <span>{item.detail.release_date}</span></h4>
                        <h4>Budget: <span>{item.detail.budget? new Intl.NumberFormat().format(item.detail.budget) : "N/A"}</span></h4>
                        <h4>Revenue: <span>{item.detail.revenue? new Intl.NumberFormat().format(item.detail.revenue) : "N/A"}</span></h4>
                        <h4>Production Countries: <span>"{item.detail.production_countries[0]?item.detail.production_countries[0].name : "N/A"}"</span></h4>
                        
                    </div>
                    <div className="detail-page-cast">
                        <h2>Cast</h2>
                        <ul>
                            {item.credits.cast.length? item.credits.cast.map((actor) => (
                                <div class="credits-data">
                                    <img src={actor.profile_path ? `https://image.tmdb.org/t/p/original/${actor.profile_path}` : defaultPerson} alt="" />
                                    <li key={actor.id}>
                                        <h4>
                                            {actor.name}
                                        </h4>
                                        <p>
                                            {actor.character}
                                        </p>
                                    </li>
                                </div>
                            )) : <h4>No cast data available</h4> }
                        </ul>
                    </div>
                </>
            )}
        </div>
    );


}