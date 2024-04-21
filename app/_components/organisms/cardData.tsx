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

    // Trigger filtering process whenever filters change
    useEffect(() => {
        // Apply filters and update loading state
        setIsLoading(true);
        const filteredProperties = applyFilters(propertyInfo, filters);
        // Sort the filtered properties by index
        filteredProperties.sort((a, b) => b.id - a.id);
        setFilteredProperties(filteredProperties);
        setIsLoading(false);
    }, [propertyInfo, filters, applyFilters]);

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
                        {filteredProperties.map((prop, i) => (
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
                            No properties found.
                        </h1>
                    </div>
                )}

                <div className="text-white font-extrabold py-2 px-5 bg-gradient-to-r from-orange-700 to-blue w-36 rounded-lg mt-6 justify-end flex items-end ml-[88%] animate-pulse">
                    <button>Load more...</button>

                </div>
            </div>
        </>
    );
};

export default CardData;


// import React, { Component, useEffect, useState } from 'react';
// import Link from 'next/link';
// import Card from './card';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios'
// import { getAllProperties } from '@/app/utils/util'
// import { debounceFetch } from "@/app/service/debounce"
// import Spinner from '../molecules/loaders/Spinner';
// import { IPropertyInfo } from '@/interfaces/app';
// import { useAppContext } from '@/store/app-context';


// const CardData: React.FC<{ showLink?: boolean; filters: any }> = ({ showLink = true, }) => {
//     const { propertyInfo, filters, applyFilters } = useAppContext();

//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [hide, setHide] = useState(false);
//     const [limit, setLimit] = useState<number>(4)
//     let [page, setPage] = useState<number>(1)
//     let [skip, setSkip] = useState<number>()
//     const [notfound, setNotfound] = useState(false)

//     // const filteredPropertyInfo = applyFilters(propertyInfo, filters);

//     // console.log('is not filtered', filteredPropertyInfo);

//     // Fetch properties data
//     const { data: propertiesData, isError: propertiesError, isLoading: propertiesLoading } = useQuery({
//         queryKey: ["properties"],
//         queryFn: async () => {
//             const { data } = await axios.get(`${getAllProperties}?limit=${page * 2}&page=${page}`);
//             return data as IPropertyInfo[];
//         }
//     });

//     // Fetch property data based on applied filters
//     const { data, isError } = useQuery({
//         queryKey: ['properties', applyFilters],
//         queryFn: async () => {
//             setIsLoading(true);
//             const response = await axios.get(`${getAllProperties}`, { params: filters });
//             setIsLoading(false);
//             return response.data as IPropertyInfo[];
//         },
//         enabled: !!filters.rooms || !!filters.bath
//     });
//     console.log('this is the filtered data', data);

//     if (isLoading) return <Spinner />;
//     if (isError) return <div className='flex justify-center items-center text-red-500'>Error fetching data</div>;

//     // if (filteredPropertyInfo.length === 0) {
//     //     return <div>No results found.</div>;
//     // }

//     // getting rooms
//     const [rooms, setRooms] = useState<string>()
//     const { data: dataRooms, refetch } = useQuery({
//         queryKey: ["rooms"],
//         queryFn: async () => {
//             const { data } = await axios.get(`http://localhost:4000/properties/room/${rooms}`)
//             const dataLength = data.length
//             if (dataLength === 0) {
//                 setNotfound(true)
//             }

//             return data as IPropertyInfo[]
//         },
//         enabled: !!rooms
//     })

//     // debounced so that my end point doesnt get exhausted, fetching onlyafter one second

//     useEffect(() => {
//         if (rooms) {
//             const debouncedFetch = debounceFetch(() => refetch(), 1000);
//             debouncedFetch();
//         }
//     }, [rooms]);

//     function searchRooms2(e: React.ChangeEvent<HTMLInputElement>) {
//         setRooms(e.target.value)
//         setHide(true)
//         setNotfound(false)
//     }

//     const displayedProperties = showLink ? propertiesData?.slice(0, 3) : propertiesData;
//     const reversedProperties = displayedProperties?.slice().reverse();

//     function loadMore() {
//         setPage((prev) => prev + 1)
//         console.log("i was clicked");
//     }

//     function skipFn() {
//         const skip = limit * (page - 1)
//         setSkip(skip)
//     }

//     return (
//         <>
//             <div className="container mx-auto mt-4 mb-6 items-center justify-center md:mx-auto md:w-3/4 lg:w-2/3">

//                 {showLink && (<div className='flex justify-between items-center mb-8 '>
//                     <div className='flex items-center font-bold font-serif mt-20'>
//                         <h1 className="text-3xl mr-6">Latest Properties</h1>
//                         <Link href='/property' passHref className='text-xl text-blue'> See All...</Link>
//                     </div>
//                     <div className='mt-20'>
//                         <input
//                             type='search'
//                             placeholder='search by baths'
//                             onChange={searchRooms2}
//                             className='border border-gray-400 px-6 py-2' />
//                     </div>

//                 </div>)}

//                 {!data ? (<>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 object-cover">
//                         {reversedProperties?.map((prop, i) => (
//                             <div key={i}>
//                                 <Card
//                                     key={i}
//                                     id={prop.id}
//                                     name={prop.name}
//                                     type={prop.type}
//                                     rooms={prop.rooms}
//                                     description={prop.description}
//                                     bath={prop.bath}
//                                     livingRooms={prop.livingRooms}
//                                     location={prop.location}
//                                     price={prop.price}
//                                     areaInKm={prop.areaInKm}
//                                     rentOrSale={prop.rentOrSale}
//                                     shortDescription={prop.shortDescription}
//                                     images={prop.images}
//                                     agentId={prop.agentId}
//                                 // onToggleFavorite={toggleFavorite}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </>
//                 ) : (
//                     <>
//                         {data && (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 object-cover">
//                             {data.map((prop, i) => (
//                                 <div key={i}>
//                                     <Card
//                                         key={i}
//                                         id={prop.id}
//                                         name={prop.name}
//                                         type={prop.type}
//                                         rooms={prop.rooms}
//                                         description={prop.description}
//                                         bath={prop.bath}
//                                         livingRooms={prop.livingRooms}
//                                         location={prop.location}
//                                         price={prop.price}
//                                         areaInKm={prop.areaInKm}
//                                         rentOrSale={prop.rentOrSale}
//                                         shortDescription={prop.shortDescription}
//                                         images={prop.images}
//                                         agentId={prop.agentId}
//                                     // onToggleFavorite={toggleFavorite}
//                                     />
//                                 </div>
//                             ))}
//                         </div>)}
//                     </>
//                 )}

//                 <button onClick={loadMore}>load more</button>

//                 <div className="flex items-center justify-center">
//                     {notfound && <h1 className=" my-10 text-2xl font-extrabold text-red-500 animate-bounce">The search is not yet available. Contact D&J for your Personalised Assistance!</h1>
//                     }
//                 </div>
//             </div>
//         </>
//     );
// };

// export default CardData;