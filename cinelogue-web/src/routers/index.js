import {createBrowserRouter, redirect} from "react-router-dom"
import BasicLayout from "../layout/BasicLayout"
import Home from "../views/Home.jsx"
import Movies from "../views/Movies"
import Series from "../views/Series"
import SearchPage from "../views/SearchPage"
import DetailPage from "../views/DetailPage"
import DetailPageSeries from "../views/DetailPageSeries"

const router = createBrowserRouter([
    {
        element:<BasicLayout></BasicLayout>,
        children:[
            {
                element:<Home></Home>,
                path:"/"
            },
            {
                element:<Movies></Movies>,
                path:"/movies"
            },
            {
                element:<Series></Series>,
                path:"/series"
            },
            {
                element:<SearchPage></SearchPage>,
                path:"/search"
            },
            {
                element:<DetailPage></DetailPage>,
                path:"/detail/:id"
            },
            {
                element:<DetailPageSeries></DetailPageSeries>,
                path:"/detailseries/:id"
            }
        ]
    }
])


export default router