// app/books/[id]/page.tsx
"use client";

import BooksService from "@/app/services/api/BookService";
import BookCard from "@/components/common/BookCard";
import CategoryCard from "@/components/common/CategoryCard";
import ErrorComponent from "@/components/common/Error";
import Loading from "@/components/common/Loading";
import SimilarBookCard from "@/components/common/SimilarBookCard";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Download, Icon } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Apple, Monitor, Smartphone, Laptop } from "lucide-react";
export default function BookComponent({ params }: { params: Promise<{ bookId: string }> }) {

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const unwrappedParams = React.use(params);

  const [book, setBook] = React.useState<any>([]);
  const [categoryBooks, setCategoryBooks] = React.useState<any>([]);
  const [similars, setSimilars] = React.useState<any>([]);

    const [os, setOs] = useState<string | null>(null);
  
    useEffect(() => {
      const userAgent = window.navigator.userAgent;
  
      // 👇 Détection simple de l'OS via user-agent
      if (userAgent.includes("Mac")) {
        setOs("macOS");
      } else if (userAgent.includes("Windows")) {
        setOs("Windows");
      } else {
        setOs("Autre");
      }
    }, []);
  React.useEffect(() => {
    getHomeContents();
    //alert(unwrappedParams.bookId);
  }, []);
  const handleClick = () => {
    // Définir les dimensions de la nouvelle fenêtre
    const width = 1100;
    const height = 700;

    // Ouvrir la fenêtre avec les dimensions spécifiées
    window.open(book.book_desktop_url, '_blank', `width=${width},height=${height}`);
  };
  const getHomeContents = async () => {

    setLoading(true);
    setError(false);
    // Utilisation de la valeur déballée
    BooksService.getSimilarBooksAndTags(unwrappedParams.bookId).then((data) => {
      console.log(data);
      setBook(data.book);
      setSimilars(data.simulars_books);
      setCategoryBooks(data.tags);

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

  if (error) {
    return (
      <ErrorComponent onPress={getHomeContents} />
    )
  }

  return (
    // <div className="max-w-2xl mx-auto mt-8 p-4">
    //     <div className="flex flex-col md:flex-row gap-6">
    //         <img
    //             src={book.image}
    //             alt={`Couverture de ${book.title}`}
    //             className="w-[300px] h-[450px] object-fill rounded-md"
    //         />
    //         <div className="flex-1">
    //             <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
    //             <p className="text-gray-600 mb-4">par {book.author.name}</p>
    //             <p className="text-gray-700">ID du livre: {book.id}</p>
    //         </div>
    //     </div>
    // </div>
    <div>
      <div className="flex flex-col md:flex-row gap-10 p-6 ">
        {/* Book Cover */}
        <div className="flex-shrink-0">
          <img
            src={book.image}
            alt={book.image}
            className="w-[200px] h-[320px] object-fill  shadow-md"
            style={{ backgroundColor: "#f1f1f1" }}
          />
        </div>

        {/* Book Details */}
        <div className="">
          {/* Title and Author */}
          <p className="text-gray-600 text-md" style={{ fontSize: "0.8rem", color: "orange" }}>{book.views} vues</p>
          <h2 className="text-2xl font-bold ">{book.title}</h2>
          <p className="text-sm text-green-500 italic" style={{ marginBottom: "25px" }}>par {book?.author_name || book.author?.name}</p>
          {/* <a href={book.book_desktop_url} target="_blank" className="mt-7  bg-blue-500 hover:bg-blue-600 text-white reader-app"
            style={{ background: '#8f6e01', padding: '8px 100px', borderRadius: '100px' }} >Lire ce livre </a>
 */}




          {/* <Link href={`/reader?url=${book.book_desktop_url}`} onClick={handleClick}
            className="mt-7  bg-blue-500 hover:bg-blue-600 text-white ml-3"
            style={{ background: '#8f6e01', padding: '8px 100px', borderRadius: '100px' }} target="_blank" >Lire ce livre</Link> */}

<button  onClick={handleClick}
            className="mt-7  bg-blue-500 hover:bg-blue-600 text-white ml-3"
            style={{ background: '#8f6e01', padding: '8px 100px', borderRadius: '100px' }} >Lire ce livre</button>
          <br />
          {/* <button className="mt-7  bg-blue-500 hover:bg-blue-600 flex border-1 reader-app"
            style={{ background: 'rgba(0, 131, 2, 0)', padding: '8px 40px', borderRadius: '100px' }} >
            <Download size={20} className="mr-2" /> Télécharger ce livre </button> */}


          {/* Summary */}
          <h3 className="mt-4 text-lg font-semibold underline">Résumé</h3>
          <p className="text-sm leading-relaxed mt-2">{book.summary}
          </p>


          <h3 className="mt-4 text-lg font-semibold underline">ISBN</h3>
          <p className="text-sm leading-relaxed mt-2">{book.isbn}
          </p>


          <div className="flex space-x-4 pt-4 metadata-book-other">
            <div className="border rounded-lg p-4 text-center shadow-md">
              <p className="text-gray-500 text-sm">Date de publication</p>
              <p className="font-semibold text-lg">{book.publication_date}</p>
            </div>
            <div className="border rounded-lg p-4 text-center shadow-md">
              <p className="text-gray-500 text-sm">Éditeur</p>
              <a href="#" className="text-blue-600 font-semibold">{book.publisher}</a>
            </div>
            <div className="border rounded-lg p-4 text-center shadow-md">
              <p className="text-gray-500 text-sm">Langue</p>
              <a href="#" className="text-blue-600 font-semibold">{book.language}</a>
            </div>
            <div className="border rounded-lg p-4 text-center shadow-md">
              <p className="text-gray-500 text-sm">Chapitre</p>
              <p className="font-semibold text-lg">{book.nb_chapitre}</p>
            </div>
          </div>

          {/* Metadata and Ratings */}
          <div className="mt-4 flex flex-col gap-2">
            {/* Ratings and Excerpt */}


            {/* Categories */}

            {/* Book Info */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold  mb-4 underline">Thématiques</h3>
              <div className="flex flex-wrap gap-4">
                {categoryBooks.map((category: any, index: number) => (
                  <CategoryCard key={index} name={category} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ paddingLeft: "50px" }}>

        <h1 style={{ fontSize: "1.4rem" }} className="mt-12 text-xl font-extrabold">Similaires</h1>




        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-sm"
          style={{ width: "90%", maxWidth: "100%" }}
        >
          <CarouselContent>
            {similars.map((item: any, index: number) => (
              <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                <div className="p-1">

                  <SimilarBookCard

                    key={item.id}
                    title={item.title}
                    id={item.id}
                    author={item?.name} author_name={item?.author_name}
                    image={item.image}
                  />

                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}