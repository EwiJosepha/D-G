'use client'

import React, { Component, useEffect, useState } from 'react';
import Link from 'next/link';
import Card from './card';
import { properties } from '@/app/propertyData';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import { getAllProperties } from '@/app/utils/util'
import { debounceFetch } from "@/app/service/debounce"
import Spinner from '../molecules/loaders/Spinner';

type Property = {
    id: number;
    name: string;
    type: string;
    description: string;
    rooms: string;
    bath: number;
    livingRooms: string;
    location: string;
    price: number;
    areaInKm: string;
    rentOrSale: string;
    shortDescription: string;
    images: string[];
    agentId: number;
}

const CardData: React.FC<{ showLink?: boolean; }> = ({ showLink = true }) => {
    // const [favorites, setFavorites] = useState<number[]>([]);
    const [hide, setHide] = useState(false);
    const [notfound, setNotfound] = useState(false)

    //getting rooms

    const [rooms, setRooms] = useState<string>()
    const { data: dataRooms, refetch } = useQuery({
        queryKey: ["rooms"],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:4000/properties/room/${rooms}`)
            const dataLength = data.length
            if (dataLength === 0) {
                setNotfound(true)
            }

            return data as Property[]
        },
        enabled: !!rooms
    })

    // debounced so that my end point doesnt get exhausted, fetching onlyafter one second

    useEffect(() => {
        if (rooms) {
            const debouncedFetch = debounceFetch(() => refetch(), 1000);
            debouncedFetch();
        }
    }, [rooms]);


    // getting all properties

    const { data, isLoading, isError } = useQuery({
        queryKey: ["properties"],
        queryFn: async () => {
            const { data } = await axios.get(getAllProperties)
            return data as Property[]
        }

    })

    if (isLoading) return <Spinner />
    if (isError) return <div className='flex justify-center items-center text-red-500'>Try again</div>


    // implementing favourites

    // const toggleFavorite = (id: number) => {
    //     setFavorites((prevFavorites) => {
    //         if (prevFavorites.includes(id)) {
    //             return prevFavorites.filter((favId) => favId !== id)
    //         } else {
    //             return [...prevFavorites, id]
    //         }
    //     })
    // }

    function searchRooms2(e: React.ChangeEvent<HTMLInputElement>) {
        setRooms(e.target.value)
        setHide(true)
        setNotfound(false)

    }

    const displayedProperties = showLink ? data?.slice(0, 3) : data;
    const reversedProperties = displayedProperties?.slice().reverse();

    return (
        <div className='bg-gray-200 pb-6 pt-2'>
            <div className="container mx-auto mt-10 items-center justify-center md:mx-auto md:w-3/4 lg:w-2/3">

                {showLink && (<div className='flex justify-between items-center mb-8'>
                    <div className='flex items-center font-bold font-serif'>
                        <h1 className="text-3xl mr-6">Latest Properties</h1>
                        <Link href='/property' passHref className='text-xl text-blue'> See All...</Link>
                    </div>
                    <div>
                        <input
                            type='search'
                            placeholder='search by baths'
                            onChange={searchRooms2}
                            className='border border-gray-400 px-6 py-2' />

                    </div>

                </div>)}

                {!rooms ? (<>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 object-cover">
                        {reversedProperties?.map((prop, i) => (
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
                                // onToggleFavorite={toggleFavorite}
                                />
                            </div>
                        ))}
                    </div></>) : (<>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 object-cover">
                            {dataRooms?.map((prop, i) => (
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
                                    // onToggleFavorite={toggleFavorite}
                                    />
                                </div>
                            ))}
                        </div>
                    </>)}
                <div className="flex items-center justify-center">
                    {notfound && <h1 className=" my-10 text-2xl font-extrabold text-red-500 animate-bounce">The search is not yet available. Contact D&J for your Personalised Assistance!</h1>
                    }
                </div>
            </div>
        </div>
    );
};

export default CardData;