"use client";
// import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import BooksService from "../../services/api/BookService";
import BookCard from "@/components/common/BookCard";
import { it } from "node:test";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import CategoryCard from "@/components/common/CategoryCard";
import PricingSection from "@/components/common/PricingPlan";
import { Apple } from "lucide-react";
import Image from "next/image";
import Loading from "@/components/common/Loading";
import ErrorComponent from "@/components/common/Error";
// import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
// import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
// import StatisticsChart from "@/components/ecommerce/StatisticsChart";
// import RecentOrders from "@/components/ecommerce/RecentOrders";
// import DemographicCard from "@/components/ecommerce/DemographicCard";



export default function Childrens() {


  const [newsBooks, setNewsBooks] = React.useState([]);
  
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    getHomeContents();
  }, []);
  const getHomeContents = async () => {
    setLoading(true);
    setError(false);
    BooksService.getContentChidren().then((data) => {

      console.log(data);
      setNewsBooks(data.recentsBooks.data);
      setLoading(false);

    }).catch((error) => {
      console.log(error);
      setLoading(false);
      setError(true);
    });
  }

  if (loading) {
    return (
      <Loading />
    )
  }

  if(error) {
    return (
      <ErrorComponent onPress={getHomeContents} />
    )
  }

  return (
    <div className="">

      <h1 style={{ fontSize: "1.6rem" }} className="text-xl font-extrabold">Nouveautés de la semaine</h1>




      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm"
        style={{ width: "90%", maxWidth: "100%" }}
      >
        <CarouselContent>
          {newsBooks.map((item: any, index) => (
            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
              <div className="p-1">

                <BookCard
                  summary={item.summary}
                  key={item.id}
                  title={item.title}
                  id={item.id}
                  author={item?.name} author_name={item?.author_name}
                  image={item.image}
                  views={item.views}
                />

              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>


 


    </div>
  );
}
