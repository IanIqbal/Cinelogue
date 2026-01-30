import { NavLink, useNavigate } from "react-router-dom"
import "./Navbar-style.css"
import { getSearchResult } from "../store/action"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import {  useState } from "react"

export default function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isSearch, setIsSearch] = useState(false)
    const isSearchLoading = useSelector((state) => state.mainSlice.isSearchLoading)
    const [searchInput, setSearchInput] = useState("")

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>Cinelogue</h1>
            </div>
            <div className="navbar-links">
                <NavLink   to="/">Home</NavLink>
                <NavLink  to="/movies">Movies</NavLink>
                <NavLink  to="/series">TV Series</NavLink>
            </div>
            <div className="input-container">
                 <input className="input-form" value={searchInput}  onChange={ (e) => { e.preventDefault() ; 
                    
                    setSearchInput(e.target.value)
                    if(e.target.value){                        
                        setTimeout(()=>{
                            navigate({pathname:"/search", search:`?query=${e.target.value}`})

                            if(!isSearchLoading){
                                dispatch(getSearchResult(e.target.value))
                            }
                        }, 2000)
                    }
                } }  type="text" />
                <FontAwesomeIcon className="search-icon" onClick={()=>{setIsSearch(!isSearch); navigate("/search")  }}  icon={faMagnifyingGlass} ></FontAwesomeIcon>
            </div>

        </nav>
    )
}