import { configureStore } from '@reduxjs/toolkit'
import slice from "./slice"

const store = configureStore({
    reducer:{
        mainSlice:slice
    }
})
export default store