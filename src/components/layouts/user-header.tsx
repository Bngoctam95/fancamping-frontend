'use client';

import Link from 'next/link';
import { Tent, Menu, X } from "lucide-react";
import { useState } from 'react';
import { Button } from '../ui/button';

export default function UserHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-forest text-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex justify-between w-full md:w-auto items-center">
            <Link href="/" className="flex items-center">
              <span className="text-3xl font-bold font-montserrat tracking-wider">FanCamping</span>
              <Tent className="ml-2 text-campfire h-6 w-6" />
            </Link>
            <button
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>

          <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-auto mt-4 md:mt-0`}>
            <ul className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6">
              <li>
                <Link href="/" className={`block px-3 py-2 rounded font-montserrat font-medium`}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/rentals" className={`block px-3 py-2 rounded font-montserrat font-medium`}>
                  Rentals
                </Link>
              </li>
              <li>
                <Link href="/blogs" className={`block px-3 py-2 rounded font-montserrat font-medium`}>
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/articles" className={`block px-3 py-2 rounded font-montserrat font-medium`}>
                  Articles
                </Link>
              </li>

              <li>
                <Link href="/auth">
                  <Button className="bg-campfire hover:bg-opacity-90 font-montserrat font-medium">
                    Login
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}