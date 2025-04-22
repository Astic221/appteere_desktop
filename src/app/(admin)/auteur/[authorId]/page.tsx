
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import BooksService from "@/app/services/api/BookService";
import Link from "next/link";
import { Facebook, Mail, MailIcon, Phone, Twitter } from "lucide-react";
import Loading from "@/components/common/Loading";
import ErrorComponent from "@/components/common/Error";

export default function ProfilePage({ params }: { params: Promise<{ authorId: string }> }) {


  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const unwrappedParams = React.use(params);
  const [selectedTab, setSelectedTab] = useState("Livres");

  const [author, setAuthor] = useState<any>({});
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);


  const fetchAuthorData = async () => {
    setLoading(true);
    setError(false);
    await BooksService.getAuthorById(unwrappedParams.authorId, page).then((data) => {
      console.log(data);
      setAuthor(data?.author);
      setBooks(data?.books.data);
      setLoading(false);
    }).catch((error) => {
      console.error("Error fetching author data:", error);
      setError(error);
      setLoading(false);

    });

  }

  useEffect(() => {
    fetchAuthorData();
  }, []);


  if (loading) {
    return (
      <Loading />
    )
  }

  if(error) {
    return (
      <ErrorComponent onPress={fetchAuthorData} />
    )
  }
  return (
    <div className="max-w-4xl mx-auto shadow-md rounded-lg overflow-hidden">
      {/* Header */}
      <div className="relative">
        <div className="inset-0 bg-gradient-to-r from-orange-100 to-orange-300 h-40"></div>
        <div className="flex items-center" style={{ marginTop: "-80px" }}>
          <img
            src={author?.image} // Change this to your actual profile image URL
            alt="Profile"
            style={{ width: "150px", height: "150px" }}

            className="rounded-full border-1 border-white z-10 shadow-lg m-4"
          />
          <div className="ml-4 mt-8">
            <h1 className="text-xl font-bold">{author?.name}</h1>
            <p className="text-gray-400">Auteur</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 flex space-x-2">

      </div>

      {/* Tabs */}
      {/* <Tabs >
        {[
          "Livres",
          "À Paraître",
          "À Propos"
        ].map((tab) => (
          <Tab
            key={tab}
            active={selectedTab === tab.toLowerCase()}
            onClick={() => setSelectedTab(tab.toLowerCase())}
          >
            {tab}
          </Tab>
        ))}
      </Tabs> */}

      <TabGroup className="">
        <hr />
        <TabList className="mt-2 ml-4 mb-2">
          <Tab className="rounded py-1 px-5 text-sm/6 font-semibold  focus:outline-none data-[selected]:bg-orange-200
         data-[hover]:bg-white/5 
         data-[focus]:outline-1 ">Livres</Tab>

          <Tab className="rounded py-1 px-5 text-sm/6 font-semibold  focus:outline-none data-[selected]:bg-orange-200
         data-[hover]:bg-white/5 
         data-[focus]:outline-1 ">À Paraître</Tab>

          <Tab className="rounded py-1 px-5 text-sm/6 font-semibold  focus:outline-none data-[selected]:bg-orange-200
         data-[hover]:bg-white/5 
         data-[focus]:outline-1 ">À Propos</Tab>
        </TabList>
        <hr />
        <TabPanels className="mt-8 ml-4">
          <TabPanel>

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

          </TabPanel>
          <TabPanel>À Paraître</TabPanel>
          <TabPanel>

            <div className="mx-auto  rounded-2xl shadow-lg overflow-hidden p-6 flex flex-col md:flex-row gap-6">
              {/* Image */}
              <div className="flex-shrink-0">
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold ">{author?.name}</h2>
                                  {/* Contact & Social */}
                <div className="mt-6 flex flex-col gap-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <MailIcon size={18} className="text-blue-500 dark:text-blue-200" />
                    <a href={`mailto:${author?.email}`} className="hover:underline dark:text-gray-200">{author?.email}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-green-500 dark:text-green-200" />
                    <span className="dark:text-gray-200">{author?.phone}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <a href={author?.facebook} target="_blank" rel="noreferrer">
                      <Facebook size={20} className="text-blue-600 dark:text-blue-200 hover:scale-110 transition-transform" />
                    </a>
                    <a href={author?.tweet} target="_blank" rel="noreferrer">
                      <Twitter size={20} className="text-sky-400 dark:text-sky-200 hover:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>
                  <p className="text-sm  mt-1 text-gray-400 dark:text-gray-200">{author?.thematic}</p>
                  <p className="mt-4">{author?.about}</p>
                </div>


              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
