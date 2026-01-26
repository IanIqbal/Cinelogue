import "./Card-style.css"

import defaultPerson from "../images/default-person2.jpg"
import defaultMovie from "../images/default-movie.png"
import defaultTv from "../images/default-tv.jpg"
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

import { useNavigate } from "react-router-dom"
export default function Card({ item }) {
  const navigate = useNavigate()
  return (
    <div className="card" key={item.id}>

      {item.media_type == "movie" && item.poster_path && <LazyLoadImage effect="blur" placeholderSrc={`https://image.tmdb.org/t/p/w92/${item.poster_path}`} onClick={(e) => { e.preventDefault(); navigate(`/detail/${item.id}`) }} className={item.adult ? "nsfw-image" : ""} src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} />}
      {item.media_type == "movie" && !item.poster_path && <img onClick={(e) => { e.preventDefault(); navigate(`/detail/${item.id}`) }} src={defaultMovie} alt={item.title} />}

      {item.media_type == "tv" && item.poster_path && <LazyLoadImage effect="blur" placeholderSrc={`https://image.tmdb.org/t/p/w92/${item.poster_path}`} onClick={(e) => { e.preventDefault(); navigate(`/detailseries/${item.id}`) }} className={item.adult ? "nsfw-image" : ""} src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} />}
      {item.media_type == "tv" && !item.poster_path && <img onClick={(e) => { e.preventDefault(); navigate(`/detailseries/${item.id}`) }} src={defaultTv} alt={item.title} />}

      {item.media_type == "person" && item.profile_path && <LazyLoadImage effect="blur" placeholderSrc={`https://image.tmdb.org/t/p/w92/${item.profile_path}`} onClick={(e) => { e.preventDefault(); navigate(`/detail/${item.id}`) }} className={item.adult ? "nsfw-image" : ""} src={`https://image.tmdb.org/t/p/original/${item.profile_path}`} alt={item.title} />}
      {item.media_type == "person" && !item.profile_path && <img src={defaultPerson} alt={item.title} />}
      {item.adult &&

        <div className="text-overlay" >
          <p>NSFW</p>
        </div>}

      <div className="card-body">
        <div className="upper-body">
          <div className="upper-body-vote">
            <h3>{item.vote_average?item.vote_average.toString().substr(0,3) : 0}</h3>
          </div>
        </div>
        {item.title && <h5 className="card-title">{item.title} {item.release_date?`(${item.release_date.substr(0,4)})`: ""}</h5>}

        {item.name && <h5 className="card-title">{item.name} {item.first_air_date?`(${item.first_air_date.substr(0,4)})` : ""}</h5>}
      </div>
    </div>
  )
}