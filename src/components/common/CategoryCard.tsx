import Link from "next/link";
import React from "react";

interface CategoryCardProps {
  name: string;
  radius?: number;
  thematic?: string
}

const lightColors = [
  "bg-red-100",
  "bg-green-100",
  "bg-blue-100",
  "bg-yellow-100",
  "bg-purple-100",
  "bg-pink-100",
  "bg-indigo-100",
  "bg-gray-100",
  "bg-teal-100",
  "bg-orange-100",
];

const CategoryCard: React.FC<CategoryCardProps> = ({ name, radius=20}) => {
  // Sélectionne une couleur aléatoire
  const randomColor = lightColors[Math.floor(Math.random() * lightColors.length)];

  return (
    <Link href={`/thematique/${name}`}
            className="cursor-pointer"

        >
    <div className={`px-4 py-2 rounded-lg p-3 ${randomColor} text-black font-semibold text-sm shadow-sm`}
    style={{paddingTop:'0.5em', paddingBottom:'0.5em',paddingLeft:'3em',paddingRight:'3em',borderRadius:`${radius}px`}}
    >
      {name}
    </div>
    </Link>
  );
};

export default CategoryCard;
