import { useDispatch, useSelector } from "react-redux"
import { getPopularMovie, getPopularSeries } from "../store/action"
import { useEffect, useState } from "react"
import CardRow from "../components/Cardrow"
import "./Home.css"
import LoadingDetail from "../components/LoadingDetail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card as CardShad, CardContent } from "@/components/ui/card"

import Card from "@/components/Card"
export default function Home() {
    const dispatch = useDispatch()
    const [selectedTab, setSelectedTab] = useState("movies");
    const popularMovies = useSelector((sliceState) => sliceState.mainSlice.popularMovies)
    const popularSeries = useSelector((sliceState) => sliceState.mainSlice.popularSeries)
    useEffect(() => {
        dispatch(getPopularMovie())
        dispatch(getPopularSeries())
    }, [])


    return (
        <>

            <div className="main-container">
                <Tabs style={{ display: "flex", justifyContent: "center" }} defaultValue="movies">
                    <TabsList className="mt-10 mb-4" variant="line">
                        <TabsTrigger value="movies">Popular Movies</TabsTrigger>
                        <TabsTrigger value="series">Popular Series</TabsTrigger>
                    </TabsList>

                    <TabsContent value="movies">

                        <Carousel  className="w-full sm:w-[85vw] max-w-none px-6 sm:px-0" >
                            <CarouselContent className="ml-0 gap-4">
                                {popularMovies.results ? popularMovies.results.map((_, index) => (
                                    <CarouselItem key={index} className="basis-full pl-0 sm:basis-1/2 sm:pl-4 lg:basis-1/4">
                                        <div className="flex justify-center p-1">
                                            <Card item={_} ></Card>
                                        </div>
                                    </CarouselItem>
                                )) :
                                    <div className="loading-container"  >
                                        <LoadingDetail></LoadingDetail>
                                    </div>}
                            </CarouselContent>
                            <CarouselPrevious className="left-2 md:-left-12" />
                            <CarouselNext className="right-2 md:-right-12" />
                        </Carousel>

                    </TabsContent>

                    <TabsContent value="series">
                        <Carousel opts={{slidesToScroll:"auto"}} className="w-full sm:w-[85vw] max-w-none px-6 sm:px-0" >
                            <CarouselContent className="ml-0 gap-4">
                                {popularSeries.results ? popularSeries.results.map((_, index) => (
                                    <CarouselItem key={index} className="basis-full pl-0 sm:basis-1/2 sm:pl-4 lg:basis-1/4">
                                        <div className="flex justify-center p-1">
                                            <Card item={_} ></Card>
                                        </div>
                                    </CarouselItem>
                                )) :
                                    <div className="loading-container"  >
                                        <LoadingDetail></LoadingDetail>
                                    </div>}
                            </CarouselContent>
                            <CarouselPrevious className="left-2 md:-left-12" />
                            <CarouselNext className="right-2 md:-right-12" />
                        </Carousel>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}
