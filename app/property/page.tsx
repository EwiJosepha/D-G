'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

const PropertyPage: React.FC = () => {
    const { applyFilters, filters, propertyInfo } = useAppContext() || {};

    const handleApplyFilters = () => {
        applyFilters(propertyInfo, filters);
    };

    return (
        <AppContextProvider>
            <>
                <Navbar />
                <div>

                    <div className='bg-gray-100 pt-6 pb-3'>
                        <h1 className='text-blue ml-[16%] font-mono flex items-center'> <BsFilter className='mr-2 text-2xl' /> FILTER BY:</h1>
                        <div className="container mx-auto mt-3 mb-2 items-center justify-start md:mx-auto md:w-[67%] flex">
                            <PropertyTypeFilter />
                            {/* <BedBathFilter onApply={handleApplyFilters} /> */}
                            <PriceRangeFilter />
                            <PropertySizeFilter />
                            <StatusFilter />
                            {/* <CardData showLink={false} filters={filters} /> */}
                        </div>
                    </div>

                    <CardData />

                </div>
                <Footer />
            </>
        </AppContextProvider>
    );
};

export default PropertyPage;
