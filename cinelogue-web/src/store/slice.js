import {createSlice, current} from "@reduxjs/toolkit"

const initialState = {popularMovies:{}, popularSeries:{},moviesByCategory:{},moviesGenres:{}, seriesGenres:{}, seriesByCategory:{}, searchResult:{}, moviesDetail:{}, seriesDetail:{}, currentSeriesPage:1, isSearchLoading:false}
export const slice = createSlice({
    name:"mainSlice",
    initialState,
    reducers: {
        setSearchLoadingSlice:(state,action) =>{            
            state.isSearchLoading = action.payload
        },
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
        },
        incrementSeriesPage: (state,action) =>{
            state.currentSeriesPage++
        },
        resetSeriesPage: (state,action) =>{
            state.currentSeriesPage = 1
        }

    }
})

export const { getPopularMoviesSlice, getPopularSeriesSlice, getSearchResultSlice, getSeriesByCategorySlice, getSeriesGenresSlice, getMoviesGenresSlice, getMoviesByCategorySlice, getMoviesDetailSlice, emptyMovieDetail,getSeriesDetailSlice, emptySeriesDetail, incrementSeriesPage, resetSeriesPage, setSearchLoadingSlice} = slice.actions

export default slice.reducer