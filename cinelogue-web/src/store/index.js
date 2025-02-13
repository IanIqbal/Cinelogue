import { legacy_createStore as createStore, applyMiddleware } from "redux"
import reducer from "./reducer"
import thunk from "redux-thunk"
import { configureStore } from '@reduxjs/toolkit'
import slice from "./slice"

// const store = createStore(reducer,applyMiddleware(thunk))
const store = configureStore({
    reducer:{
        mainSlice:slice
    }
})
export default store