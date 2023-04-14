import { GET_MOVIES_BY_CATEGORY, GET_POPULAR_MOVIES, GET_POPULAR_SERIES, GET_MOVIES_GENRES, GET_SERIES_GENRES, GET_SERIES_BY_CATEGORY, GET_SEARCH_RESULT, GET_MOVIE_DETAIL, GET_MOVIE_CREDITS, GET_SERIES_DETAIL, GET_SERIES_CREDITS } from "./actionType";
import axios from "axios"


const baseUrl = "https://api.themoviedb.org/3"
const apiKey = `api_key=${process.env.REACT_APP_TMDB_API}`

const getPopularMoviesDone = (payload) => {
    return {
        type: GET_POPULAR_MOVIES,
        payload
    }
}

const getPopularSeriesDone = (payload) => {
    return {
        type: GET_POPULAR_SERIES,
        payload
    }
}

const getMoviesByCategoryDone = (payload) => {
    return {
        type: GET_MOVIES_BY_CATEGORY,
        payload
    }
}

const getSeriesByCategoryDone = (payload) => {
    return {
        type: GET_SERIES_BY_CATEGORY,
        payload
    }
}

const getMoviesGenresDone = (payload) => {
    return {
        type: GET_MOVIES_GENRES,
        payload
    }
}

const getSeriesGenresDone = (payload) => {
    return {
        type: GET_SERIES_GENRES,
        payload
    }
}

const getSearchResultDONE = (payload)=>{
    return {
        type:GET_SEARCH_RESULT,
        payload
    }
}

const getMovieDetailDone = (payload)=>{
    return{
        type:GET_MOVIE_DETAIL,
        payload
    }
}

const getMovieCreditsDone = (payload) =>{
    return{
        type:GET_MOVIE_CREDITS,
        payload
    }
}

const getSeriesDetailDone = (payload) =>{
    return{
        type:GET_SERIES_DETAIL,
        payload
    }
}

const getSeriesCreditsDone = (payload)=>{
    return{
        type:GET_SERIES_CREDITS,
        payload
    }
}

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

            console.log(data);
            console.log(creditsDataClean);
            return {detail:data, credits:creditsDataClean}
        } catch (error) {
            console.log(error);
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

            console.log(data);
            console.log(creditsDataClean);
            return {detail:data, credits:creditsDataClean}
        } catch (error) {
            console.log(error);
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

            dispatch(getSeriesGenresDone(data))
        } catch (error) {
            console.log(error);
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

            dispatch(getMoviesGenresDone(data))
            console.log(data);
        } catch (error) {
            console.log(error);
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

            // console.log(data);

            let limitedData = []

            data.results.forEach((el, index) => {
                if (index < 14) {
                    el.media_type = "movie"
                    limitedData.push(el)
                }
            })
            data.results = limitedData
            dispatch(getPopularMoviesDone(data))
        }

        catch (error) {
            console.log(error);
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

            dispatch(getPopularSeriesDone(data))
        } catch (error) {
            console.log(error);
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
                // console.log(movies);
                if (movies.length > 0 ) {

                    movies = [...movies, ...data.results]
                    data.results = movies
                } else {
                    movies = [...data.results]
                }

                // console.log(data.results.length);
                dispatch(getMoviesByCategoryDone(data))
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
                dispatch(getMoviesByCategoryDone(data))
                currentCategory = category

            }

        } catch (error) {
            console.log(error);
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
                dispatch(getSeriesByCategoryDone(data))
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
                dispatch(getSeriesByCategoryDone(data))
                currentCategorySeries = category
            }

        } catch (error) {
            console.log(error);
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
                // url:"https://api.themoviedb.org/3/search/multi?api_key=b860a096974243a697b8c332fdc7be7a&language=en-US&query=dwayne&page=1&include_adult=true",
                url:`${baseUrl}/search/multi?${apiKey}&query=${query}&page=${page}&include_adult=false`,
                method:"get"
            })

            // console.log(data.results);

            if(currentQuery != query || page == 1){
                searchResult = []
            }

            if(searchResult.length>0){
                searchResult = [...searchResult,... data.results ]
                data.results = searchResult
            }else{
                searchResult = [...data.results]
            }
            // console.log(query);
            // console.log(data.results);
            if(page >= data.total_pages){
                data.isMaxReached = true
            }
            dispatch(getSearchResultDONE(data))
            currentQuery = query
        } catch (error) {
            // console.log(error);
            return error
        }
    }
}