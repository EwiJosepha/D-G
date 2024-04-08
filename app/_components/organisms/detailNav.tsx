'use client'

import React, { useState } from 'react';
import FooterLogo from './footerLogo';
import Link from 'next/link';
import { FaBars, FaHeart, FaTimes } from 'react-icons/fa';
import { FaCodeMerge } from 'react-icons/fa6';

function DetailNav() {
  const [isMobileView, setIsMobileView] = useState(false);

  const handleMobile = () => {
    setIsMobileView((prevIsMobileView) => !prevIsMobileView);
  };

  return (
    <>
      <div className="detailspageWrapper md:px-24 px-6 z-10 w-full text-white font-extrabold text-lg bg-black bg-opacity-60 fixed ">

        <div className="villa">
          <FooterLogo />
        </div>

        <button className="md:hidden" onClick={handleMobile}>
          {isMobileView ? <FaTimes /> : <FaBars />}
        </button>

        {isMobileView && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-300 p-4 z-10">
            <div className="space-y-4 items-center mt-4 flex flex-col">
              <Link href="/contactPage">Contact Us</Link>
              <Link href="/description">Amenities</Link>
              <Link href="/#">Get Help</Link>
            </div>
          </div>
        )}

        <div className="hidden md:flex items-center space-x-16">
          <Link href="/contactPage">Contact Us</Link>
          <Link href="/description">Amenities</Link>
          <Link href="/dashboard/myProperties">Dashboard</Link>
          <FaHeart />
          <FaCodeMerge />
        </div>

      </div>
    </>
  );
}

export default DetailNav;
