    // components/authors/AuthorGrid.tsx
'use client'
import Link from 'next/link';

const defaultImage = 'https://www.flaticon.com/fr/icone-gratuite/homme-daffaire_4532510?term=homme&page=1&position=7&origin=search&related_id=4532510';

export default function AuthorGrid({ authors }: { authors: any[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {authors?.map((author) => (
        <div 
          key={author.id} 
          className="rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group flex flex-col items-center text-center p-4"
        >
          <div className="w-24 h-24 mb-4">
            <img 
              src={author.image || defaultImage} 
              alt={author.name}
              className="w-full h-full object-cover rounded-full mx-auto shadow-md group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <h5 className="font-bold text-sm truncate">{author.name}</h5>
          <p className="text-sm ">{author.domain}</p>
          <Link href={`/auteur/${author.id}`} className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-md text-sm 
          font-medium hover:bg-indigo-700 transition-colors" style={{backgroundColor:"#816405"}}>
            Voir le catalogue
          </Link>
        </div>
      ))}
    </div>
  );
}
