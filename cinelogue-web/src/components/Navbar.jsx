import { NavLink, useNavigate } from "react-router-dom"
import { getSearchResult } from "../store/action"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"

export default function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isSearch, setIsSearch] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const isSearchLoading = useSelector((state) => state.mainSlice.isSearchLoading)
    const [searchInput, setSearchInput] = useState("")

    return (
        <nav className="w-full bg-slate-800 text-white">
            <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:flex-nowrap">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-semibold tracking-wide" style={{ fontFamily: "'Audiowide', cursive" }}>
                        Cinelogue
                    </h1>
                </div>
                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-white/20 px-3 py-2 text-sm text-white md:hidden"
                    aria-label="Toggle navigation"
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                >
                    Menu
                </button>
                <div className={`${isMenuOpen ? "flex" : "hidden"} w-full flex-col items-start gap-4 md:flex md:w-auto md:flex-row md:items-center`}>
                    <div className="flex flex-col gap-3 text-lg md:flex-row md:gap-6">
                        <NavLink to="/" className="transition hover:text-amber-400">Home</NavLink>
                        <NavLink to="/movies" className="transition hover:text-amber-400">Movies</NavLink>
                        <NavLink to="/series" className="transition hover:text-amber-400">TV Series</NavLink>
                    </div>
                    <div className="flex w-full items-center justify-between rounded-full bg-white px-3 py-2 text-slate-900 md:w-64">
                        <input
                            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none"
                            value={searchInput}
                            onChange={(e) => {
                                e.preventDefault()
                                setSearchInput(e.target.value)
                                if (e.target.value) {
                                    setTimeout(() => {
                                        navigate({ pathname: "/search", search: `?query=${e.target.value}` })

                                        if (!isSearchLoading) {
                                            dispatch(getSearchResult(e.target.value))
                                        }
                                    }, 2000)
                                }
                            }}
                            type="text"
                            placeholder="Search..."
                        />
                        <FontAwesomeIcon
                            className="cursor-pointer text-slate-700"
                            onClick={() => { setIsSearch(!isSearch); navigate("/search") }}
                            icon={faMagnifyingGlass}
                        />
                    </div>
                </div>
            </div>
        </nav>
    )
}
