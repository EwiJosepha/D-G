'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterBar from '@/components/filters/filter-bar';
import CardData from '@/components/organisms/cardData';
import Navbar from '@/components/organisms/navbar';
import Footer from '@/components/organisms/footer';

interface Property {
    id: number;
    name: string;
    type: string;
    description: string;
    rooms: string;
    bath: number;
    livingRooms: string;
    location: string;
    price: number;
    areaInKm: number;
    rentOrSale: string;
    shortDescription: string;
    images: string[];
    agentId: number;
}

const PropertyPage: React.FC = () => {
    const [filteredData, setFilteredData] = useState<Property[]>([]);
    const [allProperties, setAllProperties] = useState<Property[]>([]);

    // Fetch all properties on component mount
    useEffect(() => {
        axios.get('http://localhost/4000/properties')
            .then(response => {
                setAllProperties(response.data);
                setFilteredData(response.data);
            })
            .catch(error => {
                console.error('Error fetching properties:', error);
            });
    }, []);

    // bedbathsfilter 
    const applyFilters = (filters: { beds?: number; baths?: number }) => {
        let filteredResults = [...allProperties];

        if (filters.beds) {
            filteredResults = filteredResults.filter(property => property.rooms === `${filters.beds} Beds`);
        }

        if (filters.baths) {
            filteredResults = filteredResults.filter(property => property.bath === filters.baths);
        }

        setFilteredData(filteredResults);
    };

    return (
        <>
            <Navbar />
            <div>
                <FilterBar />
                <CardData showLink={false} data={filteredData} />

            </div>
            <Footer />
        </>

    );
};

export default PropertyPage;
