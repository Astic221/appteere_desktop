// app/books/[id]/page.tsx
"use client";

import BooksService from "@/app/services/api/BookService";
import BookCard from "@/components/common/BookCard";
import CategoryCard from "@/components/common/CategoryCard";
import SimilarBookCard from "@/components/common/SimilarBookCard";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useParams, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function FaculteComponent({ params }: { params: Promise<{ bookId: string }> }) {
  const tags = [
    "Tous",
    "Cours et manuels",
    "Thèses et mémoires",
    "Revues",
    "Articles",
    "Livres"
  ];
  const unwrappedParams = React.use(params);

  const [book, setBook] = React.useState<any>([]);
  const [categoryBooks, setCategoryBooks] = React.useState<any>([]);
  const [similars, setSimilars] = React.useState<any>([]);
  const [selectedTag, setSelectedTag] = useState("Tous");
  React.useEffect(() => {

  }, []);

  const getHomeContents = async () => {
    // Utilisation de la valeur déballée
  

  }

  return (

    <div>
    <div className="flex flex-wrap gap-2 p-4">
      {tags.map((tag, index) => (
        <div 
          key={index}
          className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors
            ${
              selectedTag === tag 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          onClick={() => setSelectedTag(tag)}
        >
          {tag}
        </div>
      ))}
    </div>


    </div>
  );
}