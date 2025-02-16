import {createSlice} from "@reduxjs/toolkit"

const initialState = {popularMovies:{}, popularSeries:{},moviesByCategory:{},moviesGenres:{}, seriesGenres:{}, seriesByCategory:{}, searchResult:{}, moviesDetail:{}, seriesDetail:{}}
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
        },
        getSeriesByCategorySlice:(state,action) =>{
            state.seriesByCategory = action.payload
        },
        getSeriesGenresSlice:(state,action) =>{
            state.seriesGenres = action.payload
        },
        getMoviesByCategorySlice:(state,action) =>{
            state.moviesByCategory = action.payload
        },
        getMoviesGenresSlice:(state,action) =>{
            state.moviesGenres = action.payload
        },
        getMoviesDetailSlice:(state,action) =>{
            state.moviesDetail = action.payload
        },
        emptyMovieDetail:(state,action)=>{
            state.moviesDetail = {}
        },
        getSeriesDetailSlice: (state,action) =>{
            state.seriesDetail = action.payload
        },
        emptySeriesDetail: (state,action) =>{
            state.seriesDetail = {}
        } 
    }
})

export const { getPopularMoviesSlice, getPopularSeriesSlice, getSearchResultSlice, getSeriesByCategorySlice, getSeriesGenresSlice, getMoviesGenresSlice, getMoviesByCategorySlice, getMoviesDetailSlice, emptyMovieDetail,getSeriesDetailSlice, emptySeriesDetail} = slice.actions

export default slice.reducer