'use client'

import React, { useEffect, useState } from "react";
import { useAppContext } from "@/store/app-context";
import Card from "../organisms/card";
import Spinner from "../molecules/loaders/Spinner";
import { IPropertyInfo } from "@/interfaces/app";
import Link from "next/link";

const CardData: React.FC<{ showLink?: boolean; }> = ({ showLink = true }) => {
    const { propertyInfo, filters, applyFilters } = useAppContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [filteredProperties, setFilteredProperties] = useState<IPropertyInfo[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [propertiesPerPage] = useState<number>(6)

    // Trigger filtering process whenever filters change
    useEffect(() => {
        // Apply filters and update loading state
        setIsLoading(true);
        const filteredProperties = applyFilters(propertyInfo, filters);
        // Sort the filtered properties by index(used id)
        filteredProperties.sort((a, b) => b.id - a.id);
        setFilteredProperties(filteredProperties);
        setIsLoading(false);
    }, [propertyInfo, filters, applyFilters, currentPage]);

    //pagination
    const indexOfLastProperty = currentPage * propertiesPerPage
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage

    const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty)

    const handleLoadMore = () => {
        setCurrentPage(prevPage => prevPage + 1)
    }

    // sliced at 3
    const slicedProperties = filteredProperties.slice(0, 3);

    if (isLoading) return <div><Spinner /></div>
    return (
        <>
            <div className="container mx-auto mt-4 mb-6 items-center justify-center md:mx-auto md:w-3/4 lg:w-2/3">

                {showLink && (<div className='flex justify-between items-center mb-8 '>
                    <div className='flex items-center font-bold font-serif mt-20'>
                        <h1 className="text-3xl mr-6">Latest Properties</h1>
                        <Link href='/property' passHref className='text-xl text-blue'> See All...</Link>
                    </div>
                    <div className='mt-20'>
                        <input
                            type='search'
                            placeholder='search by baths'
                            // onChange={searchRooms2}
                            className='border border-gray-400 px-6 py-2' />
                    </div>

                </div>)}
                {/*display slice property card to the landing page */}
                {showLink && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 object-cover">
                        {slicedProperties.map((prop, i) => (
                            <div key={i}>
                                <Card
                                    key={i}
                                    id={prop.id}
                                    name={prop.name}
                                    type={prop.type}
                                    rooms={prop.rooms}
                                    description={prop.description}
                                    bath={prop.bath}
                                    livingRooms={prop.livingRooms}
                                    location={prop.location}
                                    price={prop.price}
                                    areaInKm={prop.areaInKm}
                                    rentOrSale={prop.rentOrSale}
                                    shortDescription={prop.shortDescription}
                                    images={prop.images}
                                    agentId={prop.agentId}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/*display property card without the slice */}
                {!showLink && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 object-cover">
                        {currentProperties.map((prop, i) => (
                            <div key={i}>
                                <Card
                                    key={i}
                                    id={prop.id}
                                    name={prop.name}
                                    type={prop.type}
                                    rooms={prop.rooms}
                                    description={prop.description}
                                    bath={prop.bath}
                                    livingRooms={prop.livingRooms}
                                    location={prop.location}
                                    price={prop.price}
                                    areaInKm={prop.areaInKm}
                                    rentOrSale={prop.rentOrSale}
                                    shortDescription={prop.shortDescription}
                                    images={prop.images}
                                    agentId={prop.agentId}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Display a message if no properties are found */}
                {!isLoading && filteredProperties.length === 0 && (
                    <div className="flex items-center justify-center">
                        <h1 className="my-10 text-2xl font-extrabold text-red-500 animate-bounce">
                            The search is not yet available. Contact D&J for your Personalised Assistance!
                        </h1>
                    </div>
                )}

                {!showLink && (<div className="text-white font-extrabold py-3 px-6 bg-blue w-36 rounded-lg mt-6 justify-end flex items-end ml-[45%] animate-pulse" onClick={handleLoadMore}>
                    <button>Load more...</button>

                </div>)}
            </div>
        </>
    );
};

export default CardData;
