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
                    <PropertyTypeFilter />
                    {/* <BedBathFilter onApply={handleApplyFilters} /> */}
                    <PriceRangeFilter />
                    <PropertySizeFilter />
                    <StatusFilter />
                    {/* <CardData showLink={false} filters={filters} /> */}
                    <CardData />

                </div>
                <Footer />
            </>
        </AppContextProvider>
    );
};

export default PropertyPage;
