
"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FiUser, FiLogOut } from 'react-icons/fi';


import { useRouter } from "next/navigation";

interface UserDropdownProps {
  initials: string;
  onLogout: () => void;
}
export default function UserDropdown({ initials, onLogout }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();


  function toggleDropdown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  
  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  function toProfile(){
    router.push("/profile");

  }

  return (
    <div className="flex items-center justify-center gap-2">
      

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-700 dark:text-gray-400 dropdown-toggle"
        >
          <div
            className="rounded-full flex items-center justify-center w-10 h-10 
            text-white font-bold text-xl bg-orange-500 dark:bg-orange-400"
            style={{ backgroundColor: "#8f6e01" }}
          >
            {initials}
          </div>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
            <button
              onClick={toProfile}
              className="w-full flex text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
             <FiUser className="mr-2 text-base" />
             <span>Mon Profil</span>
            </button>
            <button
              onClick={onLogout}
              className="w-full flex text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
             <FiLogOut className="mr-2 text-base" />
              <span>Déconnexion</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
