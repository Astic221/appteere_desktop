'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import {UniversityService} from '../../services/api/UniversityService' 
import BookCard from "@/components/common/BookCard";

const contentTypes = [
  'Cours et manuels',
  'Thèses et mémoires',
  'Revues',
  'Livres',
  'Articles',
]

export default function FacultyPage() {
  const [faculties, setFaculties] = useState<any[]>([])
  const [selectedFaculty, setSelectedFaculty] = useState<number | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const [contents, setContents] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState(contentTypes[0])

  // Charger toutes les facultés
  useEffect(() => {
    UniversityService.getFaculties()
      .then(setFaculties)
      .catch((err) => console.error('Erreur chargement facultés', err))
  }, [])

  

  useEffect(() => {
    if (selectedLevel !== null && selectedFaculty !== null) {
      const level = faculties[selectedFaculty]?.levels[selectedLevel]
      if (level) {
        UniversityService.getFacultyLevelContents(level.id)
          .then((data) => {
            // console.log(data);
            // console.log("Contenus filtrés :", contents.filter((content) => content.type === activeTab));

            setContents(data.contents || []);
          })
          .catch((err) => console.error('Erreur contenus', err))
      }
    }
  }, [selectedLevel, selectedFaculty])
  

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      {/* Facultés */}
      {/* <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">🎓 Facultés</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {faculties.map((faculty, index) => (
            <div
              key={faculty.id}
              onClick={() => {
                setSelectedFaculty(index)
                setSelectedLevel(null)
              }}
              className={clsx(
                'cursor-pointer transition-all duration-300 rounded-xl overflow-hidden border shadow-sm hover:shadow-md',
                selectedFaculty === index
                  ? 'border-indigo-600 ring-1 ring-indigo-200 bg-indigo-50'
                  : 'border-gray-200 bg-white'
              )}
            >
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 text-white flex items-center justify-between">
                <span className="text-sm font-semibold">{faculty.name}</span>
              </div>
              <div className="p-3 text-xs text-gray-600">
                Cliquez pour voir les niveaux
              </div>
            </div>
          ))}
        </div>
      </section> */}
    
    <section>
    <h2 className="text-3xl font-bold mb-6 text-gray-800"> Facultés</h2>

  <div className="flex flex-wrap  gap-4">
    {faculties.map((faculty, index) => (
      <div
        key={faculty.id}
        onClick={() => {
          setSelectedFaculty(index)
          setSelectedLevel(null)
        }}
        className={clsx(
          'cursor-pointer group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105',
          selectedFaculty === index ? 'ring-2 ring-yellow-600' : ''
        )}
        style={{
          width: '140px',
          height: '65px',
          backgroundColor: '#8f6e01',
        }}
      >
        <div className="relative flex items-center justify-center h-full px-2 text-center">
          <span className="text-white text-xl sm:text-base font-extrabold leading-tight drop-shadow">
            {faculty.name}
          </span>
        </div>
      </div>
    ))}
  </div>
</section>









      {/* Niveaux */}
      {selectedFaculty !== null && (
  <section>
    <h3 className="text-2xl font-bold mb-4 text-gray-700">Niveaux</h3>
    <div className="flex flex-wrap gap-3">
      {faculties[selectedFaculty]?.levels?.map((level: any, index: number) => (
        <button
          key={level.id}
          onClick={() => setSelectedLevel(index)}
          className={clsx(
            'px-4 py-2 rounded-full border transition text-sm font-medium',
            selectedLevel === index
              ? 'bg-black text-white border-black'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
          )}
        >
           {level.level}
        </button>
      ))}
    </div>
  </section>
)}


      {/* Tabs et contenus */}
      {selectedLevel !== null && (
  <section>
    {/* Tabs */}
    <div className="flex flex-wrap gap-2 border-b border-gray-200 mb-6">
      {contentTypes.map((type) => (
        <button
          key={type}
          onClick={() => setActiveTab(type)}
          className={clsx(
            'px-4 py-2 text-sm font-medium rounded-t-md',
            activeTab === type
              ? 'bg-black text-white' // Remplacé par noir pour l'onglet actif
              : 'text-gray-600 hover:bg-gray-100'
          )}
        >
          {type}
        </button>
      ))}
    </div>

    {/* Contenus */}
    {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {contents
        .filter((content) => content.type === activeTab)
        .map((content) => (
          <div
            key={content.id}
            className="rounded-xl bg-white shadow-md p-4 hover:shadow-lg transition"
          >
            <div className="h-40 bg-gray-200 rounded mb-4 overflow-hidden">
              {content.image ? (
                <img
                  src={content.image}
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-300 animate-pulse" />
              )}
            </div>
            <div className="text-lg font-semibold text-gray-800 mb-1">
              {content.title}
            </div>
            <div className="text-sm text-gray-500 mb-2">
              {content.author || 'Auteur inconnu'}
            </div>
            <span className="inline-block text-xs bg-black text-white px-3 py-1 rounded-full">
              {content.type}
            </span>
          </div>
        ))}
    </div> */}

<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {contents
    .filter((content) => content.type === activeTab)
    .map((content) => (
      <BookCard
        key={content.id}
        id={content.id}
        title={content.title}
        image={content.image}
        summary={content.summary}
        views={content.views}
        author_name={content.author}
        author={{ name: content.author }}
      />
    ))}
</div>

  </section>
)}

    </div>
  )
}
