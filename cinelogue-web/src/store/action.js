import axios from "axios"
import { getMoviesByCategorySlice, getMoviesDetailSlice, getMoviesGenresSlice, getPopularMoviesSlice, getPopularSeriesSlice, getSearchResultSlice, getSeriesByCategorySlice, getSeriesDetailSlice, getSeriesGenresSlice, incrementSeriesPage, resetSeriesPage,setSearchLoadingSlice } from "./slice";

const baseUrl = `${import.meta.env.VITE_API_MAIN_URL}`

export const getMovieDetailCredits = (id) => {
    return async (dispatch) => {
        try {

            let { data } = await axios({
                url: `${baseUrl}/movies/detailCredits/${id}`,
                method: "get"
            })

            let creditsDataClean = data.creditsData

            dispatch(getMoviesDetailSlice({ detail: data, credits: creditsDataClean }))
        } catch (error) {
            return error
        }
    }
}

export const getSeriesDetailCredits = (id) => {
    return async (dispatch) => {
        try {
            let { data } = await axios({
                url: `${baseUrl}/series/detailCredits/${id}`,
                method: "get"
            })

            let creditsDataClean = data.creditsData

            dispatch(getSeriesDetailSlice({ detail: data, credits: creditsDataClean }))
        } catch (error) {
            return error
        }
    }
}

export const getSeriesGenres = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                url: `${baseUrl}/series/genres`,
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
                url: `${baseUrl}/movies/genres`,
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
                url: `${baseUrl}/movies/popular`,
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
                url: `${baseUrl}/series/popular`,
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

            if (category == "top_rated" || category == "upcoming" || category == "now_playing") {

                let { data } = await axios({
                    url: `${baseUrl}/movies/${category}?page=${page}`,
                    method: "get"
                })

                data.results.forEach(e => {
                    e.media_type = "movie"
                })

                if (currentCategory != category || page == 1) {
                    movies = []
                }
                if (movies.length > 0) {

                    movies = [...movies, ...data.results]
                    data.results = movies
                } else {
                    movies = [...data.results]
                }

                dispatch(getMoviesByCategorySlice(data))
                currentCategory = category
            } else {

                let { data } = await axios({
                    url: `${baseUrl}/movies/with_genres?page=${page}&genres=${category}`,
                    method: "get"
                })
                data.results.forEach(e => {
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
                    url: `${baseUrl}/series/${category}?page=${page}`,
                    method: "get"
                })
                
                data.results.forEach(e => {
                    e.media_type = "tv"
                })

                if (currentCategorySeries != category || page == 1) {
                    series = []
                    dispatch(resetSeriesPage())
                }

                if (series.length) {
                    const filtered = data.results.filter((el) => {
                        return series.findIndex((item) => item.id == el.id) < 0
                    })
                    series = [...series, ...filtered]
                } else {
                    series = [...data.results]
                }

                data.results = [...series]
                dispatch(getSeriesByCategorySlice(data))
                currentCategorySeries = category
            } else {

                let { data } = await axios({
                    url: `${baseUrl}/series/with_genres?genres=${category}&page=${page}`,
                    method: "get"
                })
                
                data.results.forEach(e => {
                    e.media_type = "tv"
                })

                if (currentCategorySeries != category) {
                    series = []
                    dispatch(resetSeriesPage())
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
export const getSearchResult = (query, page = 1) => {
    return async (dispatch) => {
        dispatch(setSearchLoadingSlice(true))
        try {
            const { data } = await axios({
                url: `${baseUrl}/general/search?query=${query}&page=${page}`,
                method: "get"
            })


            if (currentQuery != query || page == 1) {
                searchResult = []
            }

            if (searchResult.length > 0) {
                searchResult = [...searchResult, ...data.results]
                data.results = searchResult
            } else {
                searchResult = [...data.results]
            }

            if (page >= data.total_pages) {
                data.isMaxReached = true
            }
            dispatch(getSearchResultSlice(data))
            currentQuery = query
        } catch (error) {
            return error
        } finally{
             dispatch(setSearchLoadingSlice(false))
        }
    }
}

export const setSearchLoading = (value) => {
    return  (dispatch) => {
        dispatch(setSearchLoadingSlice(value))
    }
}