import { useEffect, useState } from "react";
import { getSeriesDetailCredits } from "../store/action";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./DetailPage.css"
import defaultPerson from "../images/default-person.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function DetailPageSeries() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [item, setItem] = useState({})
    useEffect(() => {
        dispatch(getSeriesDetailCredits(id))
            .then(response => {
                setItem(response)
            })

        return () => setItem({})
    }, [])
    console.log(item);
    return (
        <div className="detail-page">
            {item.detail && (
                <>
                    <div className="detail-main"  >
                        <div className="detail-background" style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original/${item.detail.poster_path}")` }}>

                        </div>
                        <div className="detail-upper">
                            <h1>{item.detail.original_name} ({item.detail.first_air_date.substr(0, 4)})</h1>
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
                        <h4>Duration: <span>{item.detail.episode_run_time.length? `${item.detail.episode_run_time.join(" minutes, ")} minutes`: "N/A"}</span></h4>
                        <h4>Status: <span>"{item.detail.status}"</span></h4>
                        <h4>First Air: <span>{item.detail.first_air_date}</span></h4>
                        <h4>Last Air: <span>{item.detail.last_air_date}</span></h4>
                        <h4>Budget: <span>{item.detail.budget? new Intl.NumberFormat().format(item.detail.budget) : "N/A"}</span></h4>
                        <h4>Revenue: <span>{item.detail.revenue? new Intl.NumberFormat().format(item.detail.revenue) : "N/A"}</span></h4>
                        <h4>Production Countries: <span>{item.detail.production_countries.length?
                            item.detail.production_countries.map((el,index) => index == item.detail.production_countries.length-1? el.name : el.name + ", ")
                        : "N/A"}</span></h4>
                        <h4>Total Seasons: <span>{item.detail.number_of_seasons}</span></h4>
                        <h4>Total Episodes: <span>{item.detail.number_of_episodes}</span></h4>
                        
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