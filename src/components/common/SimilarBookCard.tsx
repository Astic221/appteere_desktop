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
    image: string;
    author_name?: string;
}

const SimilarBookCard: React.FC<CardProps> = ({ id, title, author, image, author_name }) => {
    const router = useRouter();
    const item = { id, title, author, image };

    const handleClick = () => {
      
        router.push(`/livres/${id}`);
    };

    return (
        <Link href={`/livres/${id}`}
            className="w-[160px] h-[340px]  rounded-sm p-3 cursor-pointer"
            
        >
            <img
                src={image}
                alt={`Couverture du livre : ${title}`}
                className="w-[160px] h-[230px] similar-imge-card"
            />
            <div className="mt-2">
                <h5 className="font-bold line-clamp-3 w-[160px]">{title}</h5>
                <p className="text-gray-600">{author_name || author?.name}</p>
            </div>
        </Link>
    );
};

export default SimilarBookCard;