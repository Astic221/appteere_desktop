'use client';
import SearchService from '@/app/services/api/SearchService';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import BookCard from '@/components/common/BookCard';
import AuthorGrid from '@/components/common/AuthorGrid';
import Link from 'next/link';

function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>({
    books: { data: [] },
    authors: { data: [] },
    publishers: { data: [] },
  });
  const [loading, setLoading] = useState(false);

  const fetchResults = useCallback(() => {
    if (!query) return;

    setLoading(true);

    const timer = setTimeout(async () => {
      const data = await SearchService.getSearchContents(query, 1);
      console.log(data);
      setResults(data);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const cleanup = fetchResults();
    return () => cleanup && cleanup();
  }, [query]);

  return (
    <div className="relative w-full max-w-lg">
      <div className="relative">
        <span className="absolute -translate-y-1/2 left-4 top-1/2 pointer-events-none">
          <svg
            className="fill-gray-500 dark:fill-gray-400"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
            />
          </svg>
        </span>
        <input
          ref={inputRef}
          type="text"
          placeholder="Rechercher un mot clé..."
          className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {isFocused && query && (
        <div className="absolute w-full mt-2 rounded-lg border bg-white shadow-lg dark:bg-gray-900 max-h-[400px] overflow-y-auto z-50">
          {loading ? (
            <div className="p-2 text-gray-500">Chargement...</div>
          ) : (
            <>
              {/* Livres */}
              {results.books?.data?.length > 0 && (
                <div>
                  <div className="px-4 py-2 font-semibold">📚 Livres</div>
                  {results.books.data.map((book: any) => (
                      <div key={book.id} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex flex-col items-center text-center">
                        <BookCard
                          key={book.id}
                          id={book.id}
                          title={book.title}
                          image={book.image}
                          summary={book.summary}
                          views={book.views}
                          author_name={book.author}
                          author={{ name: book.author }}
                        />
                      </div>
                  ))}
                </div>
              )}

              {/* Auteurs */}
              
              {results.authors?.data?.length > 0 && (
                <div>
                  <div className="px-4 py-2 font-semibold">🧑‍🎓 Auteurs</div>
                  {results.authors.data.map((author: any) => (
                     <div 
                     key={author.id} 
                     className="rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group flex flex-col items-center text-center p-6 m-12"
                   >
                     <div className="w-24 h-24 mb-4">
                       <img 
                         src={author.image} 
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
              )}

              {/* Éditeurs */}
              {results.publishers?.data?.length > 0 && (
                <div>
                  <div className="px-4 py-2 font-semibold">🏢 Éditeurs</div>
                  {results.publishers.data.map((publisher: any) => (
                          <div 
                          key={publisher.id} 
                          className="rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group flex flex-col items-center text-center p-6 m-12"
                          >
                          <div className="w-24 h-24 mb-4">
                            <img 
                              src={publisher.image} 
                              alt={publisher.name}
                              className="w-full h-full object-cover rounded-full mx-auto shadow-md group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <h5 className="font-bold text-sm truncate">{publisher.name}</h5>
                          <p className="text-sm ">{publisher.domain}</p>
                          <Link href={`/auteur/${publisher.id}`} className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-md text-sm 
                          font-medium hover:bg-indigo-700 transition-colors" style={{backgroundColor:"#816405"}}>
                            Voir le catalogue
                          </Link>
              
                          
                        </div>
                  ))}
                </div>
              )}

              {/* Aucun résultat */}
              {results.books.data?.length === 0 &&
                results.authors.data?.length === 0 &&
                results.publishers.data?.length === 0 && (
                  <div className="p-2 text-gray-500">Aucun résultat trouvé</div>
                )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;

