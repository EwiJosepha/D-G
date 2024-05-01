'use client'

import React, { useState } from 'react';
import CardData from '@/components/organisms/cardData';
import Navbar from '@/components/organisms/navbar';
import Footer from '@/components/organisms/footer';
import PropertyTypeFilter from '@/components/filters/property-type';
import BedBathFilter from '@/components/filters/bed-bathrooms';
import PriceRangeFilter from '@/components/filters/price-range';
import PropertySizeFilter from '@/components/filters/property-size';
import StatusFilter from '@/components/filters/status-filter';
import { AppContextProvider, useAppContext } from '@/store/app-context';
import { BsFilter } from 'react-icons/bs';
import FooterLogo from '@/components/organisms/footerLogo';
import { FaTimes } from 'react-icons/fa';

const PropertyPage: React.FC = () => {

    const [navbar, setNavbar] = useState(false)
    const { applyFilters, filters, propertyInfo } = useAppContext() || {};

    const handleApplyFilters = () => {
        applyFilters(propertyInfo, filters);
    };

    return (
        <AppContextProvider>
            <>
                {/* <Navbar /> */}
                <div className=' w-screen fixed top-0 left-0
             right-0 z-10 shadow-lg'>

                    <div className="flex items-center justify-between py-3 md:py-5 md:block max-w-full bg-blue px-3">
                        {/* LOGO */}
                        <FooterLogo />
                        <div className="md:hidden">
                            <button className="p-2 text-white rounded-md outline-none focus:border-gray-300 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >{navbar ? (<FaTimes />) : (<BsFilter className='text-2xl' />)}
                            </button>
                        </div>
                    </div>

                    <div className={`bg-gray-100 flex-1 justify-self-center pb-3 md:block md:pb-0 md:mt-0 ${navbar ? 'p-12 md:p-0 block' : 'hidden'
                        }`}>

                        <h1 className='text-blue md:ml-[16%] font-mono flex items-center mb-6 md:mb-0 md:pt-5 font-extrabold md:font-extralight'> <BsFilter className='mr-2 text-2xl' /> FILTER BY:</h1>
                        <div className="container h-screen md:h-auto mx-auto mt-3 md:pb-5 items-center justify-start md:mx-auto md:w-[67%] md:flex space-y-10 md:space-y-0">
                            <PropertyTypeFilter />
                            <BedBathFilter />
                            <PriceRangeFilter />
                            <PropertySizeFilter />
                            <StatusFilter />
                        </div>
                    </div>
                </div>

                <div className="md:mt-60 mt-24">
                    <CardData showLink={false} />
                </div>

                <Footer />
            </>
        </AppContextProvider>
    );
};

export default PropertyPage;
