import axios from "axios"
import { getMoviesByCategorySlice, getMoviesDetailSlice, getMoviesGenresSlice, getPopularMoviesSlice, getPopularSeriesSlice, getSearchResultSlice, getSeriesByCategorySlice, getSeriesDetailSlice, getSeriesGenresSlice } from "./slice";

const baseUrl = `${process.env.REACT_APP_MAIN_URL}`

const apiKey = `api_key=${process.env.REACT_APP_TMDB_API}`


export const getMovieDetailCredits = (id)=>{
    return async (dispatch)=>{
        try {
            
            let {data} = await axios({
                url:`${baseUrl}/movie/${id}?${apiKey}`,
                method:"get"
            })


            let creditsDataRaw = await axios({
                url:`${baseUrl}/movie/${id}/credits?${apiKey}`,
                method:"get"
            })

            let creditsDataClean = creditsDataRaw.data
            console.log({detail:data, credits:creditsDataClean}, "<<<<<")
            dispatch(getMoviesDetailSlice({detail:data, credits:creditsDataClean}))
        } catch (error) {
            return error
        }
    }
}

export const getSeriesDetailCredits = (id) =>{
    return async(dispatch)=>{
        try {
            let {data} = await axios({
                url:`${baseUrl}/tv/${id}?${apiKey}`,
                method:"get"
            })


            let creditsDataRaw = await axios({
                url:`${baseUrl}/tv/${id}/credits?${apiKey}`,
                method:"get"
            })

            let creditsDataClean = creditsDataRaw.data

            dispatch(getSeriesDetailSlice({detail:data, credits:creditsDataClean})) 
        } catch (error) {
            return error
        }
    }
}

export const getSeriesGenres = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                url: `${baseUrl}/genre/tv/list?${apiKey}`,
                method: "get"
            })

            dispatch(getSeriesGenresSlice(data))
        } catch (error) {
            return error
        }
    }
}

export const getMoviesGenres = () => {
    return async (dispatch) => {
        try {
            let { data } = await axios({
                url: `${baseUrl}/genre/movie/list?${apiKey}&language=en-US`,
                method: "get"
            })

            dispatch(getMoviesGenresSlice(data))
        } catch (error) {
            return error
        }
    }
}

export const getPopularMovie = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                url: `${baseUrl}/movie/popular?${apiKey}`,
                method: "get"
            })
            
            let limitedData = []
            
            data.results.forEach((el, index) => {
                if (index < 14) {
                    el.media_type = "movie"
                    limitedData.push(el)
                }
            })
            data.results = limitedData
            dispatch(getPopularMoviesSlice(data))
        }

        catch (error) {
            return error
        }
    }
}

export const getPopularSeries = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                url: `${baseUrl}/tv/popular?${apiKey}`,
                method: "get"
            })


            let limitedData = []

            data.results.forEach((el, index) => {
                if (index < 14) {

                    el.media_type = "tv"
                    limitedData.push(el)

                }
            })
            data.results = limitedData

            dispatch(getPopularSeriesSlice(data))
        } catch (error) {
            return error
        }
    }
}

let movies = []
let currentCategory
export function getMoviesByCategory(category = "top_rated", page = 1) {
    return async (dispatch) => {
        try {

            if (category == "top_rated" || category == "upcoming") {

                let { data } = await axios({
                    url: `${baseUrl}/movie/${category}?${apiKey}&language=en-US&page=${page}`,
                    method: "get"
                })

                data.results.forEach(e =>{
                    e.media_type = "movie"
                })

                if (currentCategory != category || page == 1) {
                    movies = []
                }
                if (movies.length > 0 ) {

                    movies = [...movies, ...data.results]
                    data.results = movies
                } else {
                    movies = [...data.results]
                }

                dispatch(getMoviesByCategorySlice(data))
                currentCategory = category
            } else {

                let { data } = await axios({
                    url: `${baseUrl}/discover/movie?${apiKey}&include_adult=false&include_video=false&page=${page}&with_genres=${category}`,
                    method: "get"
                })
                data.results.forEach(e =>{
                    e.media_type = "movie"
                })

                if (currentCategory != category) {
                    movies = []
                }

                if (movies.length) {

                    movies = [...movies, ...data.results]
                } else {
                    movies = [...data.results]
                }

                data.results = movies
                dispatch(getMoviesByCategorySlice(data))
                currentCategory = category

            }

        } catch (error) {
            return error
        }
    }
}

let series = []
let currentCategorySeries
export function getSeriesByCategory(category = "top_rated", page = 1) {
    return async (dispatch) => {
        try {


            if (category == "top_rated" || category == "on_the_air") {

                let { data } = await axios({
                    url: `${baseUrl}/tv/${category}?${apiKey}&language=en-US&page=${page}`,
                    method: "get"
                })

                data.results.forEach(e =>{
                    e.media_type = "tv"
                })

                if (currentCategorySeries != category || page == 1) {
                    series = []
                }

                if (series.length) {

                    series = [...series, ...data.results]
                } else {
                    series = [...data.results]
                }

                data.results = series
                dispatch(getSeriesByCategorySlice(data))
                currentCategorySeries = category
            } else {

                let { data } = await axios({
                    url: `${baseUrl}/discover/tv?${apiKey}&include_adult=false&include_video=false&page=${page}&with_genres=${category}`,
                    method: "get"
                })

                data.results.forEach(e =>{
                    e.media_type = "tv"
                })

                if (currentCategorySeries != category) {
                    series = []
                }

                if (series.length) {

                    series = [...series, ...data.results]
                } else {
                    series = [...data.results]
                }

                data.results = series
                dispatch(getSeriesByCategorySlice(data))
                currentCategorySeries = category
            }

        } catch (error) {
            return error
        }
    }
}

let searchResult = []
let currentQuery
export const getSearchResult = (query, page = 1)=>{
    return async(dispatch) => {
        try {
            const {data} = await axios({
                url:`${baseUrl}/search/multi?${apiKey}&query=${query}&page=${page}&include_adult=false`,
                method:"get"
            })


            if(currentQuery != query || page == 1){
                searchResult = []
            }

            if(searchResult.length>0){
                searchResult = [...searchResult,... data.results ]
                data.results = searchResult
            }else{
                searchResult = [...data.results]
            }
         
            if(page >= data.total_pages){
                data.isMaxReached = true
            }
            dispatch(getSearchResultSlice(data))
            currentQuery = query
        } catch (error) {
            return error
        }
    }
}