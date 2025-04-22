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
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function ThematicComponent({ params }: { params: Promise<{ thematic: string }> }) {

  const unwrappedParams = React.use(params);

  const [books, setBooks] = React.useState<any>([]);
  const [page, setPage] = React.useState(1);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const getBooksByCategory = async () => {
    setLoading(true);
    setError(false);
    // Utilisation de la valeur déballée
    BooksService.getBooksByCategory(unwrappedParams.thematic, page).then((data) => {
      console.log(data.data);
      setBooks(data.data);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
      setError(true);
    });
  }
  useEffect(() => {
    getBooksByCategory()
  }, [page])


  if (loading) {
    return (
      <Loading />
    )
  }

  if(error) {
    return (
      <ErrorComponent onPress={getBooksByCategory} />
    )
  }

  return (



    <div className="w-full overflow-hidden">
      <div className="mb-4">

        <div className="flex " ><p className="text-l underline mr-2 font-semibold">Livres </p> 
        <p className="text-l text-gray-400  "> {'  >  '+unwrappedParams.thematic}</p></div>

      </div>
      <div className="flex flex-wrap  gap-4 contatainer-thematic">
        {books.map((book: any) => (
          <div
            key={book.id}
            className="  rounded-sm border border-gray-200 dark:border-gray-700 book-categ mt-6"
          >
   
            <Link href={`/livres/${book.id}`}
          

        >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-fill "
              />
              </Link>

            <div className="mt-2 pr-2 pl-2">
              <h3 className="text-lg font-semibold line-clamp-2">{book.title}</h3>
              <p className="text-gray-600 mt-1 line-clamp-1" style={{ fontSize: '13px', color: '#dc4d04' }}>{book.author?.name}</p>
              <p className="text-sm text-gray-500">{book.views} vues</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}