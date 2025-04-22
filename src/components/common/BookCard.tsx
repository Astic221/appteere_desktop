// app/components/BookCard.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CardProps {
    id: string;
    title: string;
    author: {
        name: string;
    };
    summary: string;
    image: string;
    views: number;
    author_name?: string;
}

const BookCard: React.FC<CardProps> = ({ id, title, author, image, summary,views, author_name }) => {
    const router = useRouter();
    const item = { id, title, author, image, summary };



    return (

         <button
         className="w-[180px] h-[380px]  rounded-sm p-3 cursor-pointer"
         onClick={() => router.push(`/livres/${id}`)}>

            <img
                src={image}
                alt={`Couverture du livre : ${title}`}
                className="w-[180px] h-[270px]   image-card"
                style={{backgroundColor: "#f1f1f1"}}
            />
            <div className="mt-2">
            <p className="text-gray-600 text-sm" style={{ fontSize: "0.8rem",color:"orange" }}>
                {views} vues
            </p>
                <h6 className="font-semibold line-clamp-3 w-[180px]">{title}</h6>
                <p className="text-sm text-orange-600 text-gray-600 w-[180px]">{author_name || author?.name}</p>
            </div>
            </button>

    );
};

export default BookCard;