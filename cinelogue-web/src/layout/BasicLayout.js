import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function BasicLayout(){

    return(
        <>
        <Navbar  ></Navbar>
        <Outlet></Outlet>
        </>
    )
}