import {createSlice} from "@reduxjs/toolkit"

const initialState = {popularMovies:{}, popularSeries:{},moviesByCategory:{},moviesGenres:{}, seriesGenres:{}, seriesByCategory:{}, searchResult:{}}
export const slice = createSlice({
    name:"mainSlice",
    initialState,
    reducers: {
        getPopularMoviesSlice: (state,action) => {
            state.popularMovies = action.payload
        },
        getPopularSeriesSlice: (state,action)=>{
            state.popularSeries = action.payload
        },
        getSearchResultSlice:(state,action) => {
            state.searchResult = action.payload
        } 
    }
})

export const { getPopularMoviesSlice, getPopularSeriesSlice, getSearchResultSlice} = slice.actions

export default slice.reducer