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



export default function NewsBooks() {


  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [newsBooks, setNewsBooks] = React.useState([]);
  const [relatedBooks, setRelatedBooks] = React.useState([]);
  const [incomingBooks, setIncomingBooks] = React.useState([]);
  const [freeBooks, setFreeBooks] = React.useState([]);
  const [popularsBooks, setPopularsBooks] = React.useState([]);

  const [categoryBooks, setCategoryBooks] = React.useState([]);

  React.useEffect(() => {
    getHomeContents();
  }, []);
  const getHomeContents = async () => {

    setLoading(true);
    setError(false);
    BooksService.getHomeContents().then((data) => {

      console.log(data);
      setNewsBooks(data.recentsBooks);
      setRelatedBooks(data.related_books);
      setIncomingBooks(data.incomingBooks);
      setFreeBooks(data.freeBooks);
      setPopularsBooks(data.populars_books);
      setCategoryBooks(data.populars_tags);

      setLoading(false);
      

    }).catch((error) => {
      console.log(error);
      setLoading(false);
      setError(true);
    });;
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


      <h1 style={{ fontSize: "1.6rem" }} className="mt-12 text-xl font-extrabold">Classiques</h1>




      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm"
        style={{ width: "90%", maxWidth: "100%" }}
      >
        <CarouselContent>
          {relatedBooks.map((item: any, index) => (
            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
              <div className="p-1">

                <BookCard
                  key={item.id}
                  summary={item.summary}
                  id={item.id}
                  title={item.title}
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



      <h1 style={{ fontSize: "1.6rem" }} className="mt-12 text-xl font-extrabold">Afrique</h1>




      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm"
        style={{ width: "90%", maxWidth: "100%" }}
      >
        <CarouselContent>
          {popularsBooks.map((item: any, index) => (
            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
              <div className="p-1">

                <BookCard
                  key={item.id}
                  summary={item.summary}
                  id={item.id}
                  title={item.title}
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

      <h1 style={{ fontSize: "1.6rem" }} className="mt-12 text-xl font-extrabold">Livres au Sénégal </h1>




      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm"
        style={{ width: "90%", maxWidth: "100%" }}
      >
        <CarouselContent>
          {incomingBooks.map((item: any, index) => (
            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
              <div className="p-1">

                <BookCard
                  key={item.id}
                  id={item.id}
                  summary={item.summary}
                  title={item.title}
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
