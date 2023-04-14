import { NavLink, useNavigate } from "react-router-dom"
import "./Navbar-style.css"
import { getSearchResult } from "../store/action"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react"
import SearchPage from "../views/SearchPage"

export default function Navbar() {
    // const searchResult = useSelector((state) => state.searchResult)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isSearch, setIsSearch] = useState(false)

  
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h2>Cinelogue</h2>
            </div>
            <div className="navbar-links">
                <NavLink   to="/">Home</NavLink>
                <NavLink  to="/movies">Movies</NavLink>
                <NavLink  to="/series">TV Series</NavLink>
            </div>
            <div>
                <FontAwesomeIcon className="search-icon" onClick={()=>{setIsSearch(!isSearch); navigate("/search")  }}  icon={faSearch} ></FontAwesomeIcon>
                 <input   onChange={ (e) => { e.preventDefault() ; 
                    
                    if(e.target.value){
                        setTimeout(()=>{
                            navigate({pathname:"/search", search:`?query=${e.target.value}`})
                            dispatch(getSearchResult(e.target.value))
                        }, 2000)
                    }
                    } }  type="text" />
            </div>

        </nav>
    )
}