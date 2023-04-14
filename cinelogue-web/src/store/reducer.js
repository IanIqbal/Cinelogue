import { GET_MOVIES_BY_CATEGORY, GET_POPULAR_MOVIES, GET_POPULAR_SERIES,GET_MOVIES_GENRES, GET_SERIES_GENRES, GET_SERIES_BY_CATEGORY, GET_SEARCH_RESULT } from "./actionType";


const initialState = {popularMovies:{}, popularSeries:{},moviesByCategory:{},moviesGenres:{}, seriesGenres:{}, seriesByCategory:{}, searchResult:{}}
const reducer = (state = initialState, action) =>{

    switch (action.type) {
        case GET_POPULAR_MOVIES:
            return {
                ...state,
                popularMovies: action.payload
            }
            
        case GET_POPULAR_SERIES:
            return {
                ...state,
                popularSeries:action.payload
            }

        case GET_MOVIES_BY_CATEGORY:
            return {
                ...state,
                moviesByCategory:action.payload
            }

        case GET_MOVIES_GENRES:
            return{
                ...state,
                moviesGenres:action.payload
            }

        case GET_SERIES_GENRES:
            return{
                ...state,
                seriesGenres:action.payload
            }

        case GET_SERIES_BY_CATEGORY:
            return{
                ...state,
                seriesByCategory:action.payload
            }

        case GET_SEARCH_RESULT:
            return{
                ...state,
                searchResult:action.payload
            }
        default:
            return state
    }
}

export default reducer