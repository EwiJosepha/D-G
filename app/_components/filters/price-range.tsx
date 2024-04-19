'use client'

import React, { useRef, useState, useEffect } from "react";
import { FaDollarSign, FaTimes } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAllProperties } from '@/app/utils/util';

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
    areaInKm: number;
    rentOrSale: string;
    shortDescription: string;
    images: string[];
    agentId: number;
}

const PriceRangeFilter: React.FC = () => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [appliedRange, setAppliedRange] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const predefinedMinPrices = [50, 100, 200, 500, 1000, 5000, 10000, 50000, 100000, 500000];
    const predefinedMaxPrices = [500000, 700000, 1000000, 1500000, 2000000, 5000000, 7500000, 10000000];

    // // fetch predefined prices from the backend 
    // const [predefinedMinPrices, setPredefinedMinPrices] = useState<number[]>([]);
    // const [predefinedMaxPrices, setPredefinedMaxPrices] = useState<number[]>([]);

    // useEffect(() => {
    //     // Fetch predefined prices from backend when component mounts
    //     fetchPredefinedPrices();
    // }, []);

    // const fetchPredefinedPrices = async () => {
    //     try {
    //         // Make an HTTP GET request to your backend API to fetch predefined prices
    //         const response = await fetch(`http://localhost:4000/properties?price=${maxPrice}&price=${minPrice}`);
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch predefined prices');
    //         }
    //         const data = await response.json();
    //         // Update state with fetched predefined prices
    //         setPredefinedMinPrices(data.predefinedMinPrices);
    //         setPredefinedMaxPrices(data.predefinedMaxPrices);
    //     } catch (error) {
    //         console.error('Error fetching predefined prices:', error);
    //     }
    // };

    const handleApplyFilter = () => {
        setAppliedRange(`$${minPrice} - $${maxPrice}`);
        setIsModalOpen(false);
        // filter search here
    };


    const handleCancelFilter = () => {
        setMinPrice('');
        setMaxPrice('');
        setAppliedRange('');
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setIsModalOpen(false);
        }
    };

    const { data } = useQuery({
        queryKey: ["properties", minPrice],
        queryFn: async () => {
            const url = `${getAllProperties}?price=${minPrice}`
            const { data } = await axios.get(url)
            if (data) {
                console.log(data, "data");
            }
            console.log("url", url);


            return data as Property[]
        }
    })

    const { data: data2 } = useQuery({
        queryKey: ["properties", maxPrice],
        queryFn: async () => {
            const url = `${getAllProperties}?price=${maxPrice}`
            const { data } = await axios.get(url)
            if (data) {
                console.log(data, "data2");
            }

            return data as Property[]
        }
    })


    useEffect(() => {
        document.body.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.body.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="text-blue">
            {!appliedRange && (
                <button className="px-4 py-2 rounded-lg mr-2 border text-sm border-gray-500 flex items-center" onClick={() => setIsModalOpen(true)}>
                    <FaDollarSign className="mr-2 text-sm" />   PRICE RANGE
                </button>
            )}

            {appliedRange && (
                <div className="items-center">
                    <button className="px-4 py-2 rounded-lg mr-2 border text-sm border-gray-500 flex items-center" onClick={handleCancelFilter}>
                        {minPrice && `$${minPrice}`}{maxPrice && ` - $${maxPrice}`} <FaTimes className="text-lg ml-2" />
                    </button>
                </div>
            )}

            {isModalOpen && (<div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                <div ref={modalRef} className="bg-white p-4 rounded-lg md:w-[23%]">
                    <h1 className="my-6 font-bold">Price Range</h1>

                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">

                            <label>Min:</label>
                            <div className="border py-3 px-8 my-3 rounded-full">

                                <select className="bg-transparent focus:outline-none" value={minPrice} onChange={(e) => setMinPrice(e.target.value)}>
                                    <option value="">Mininum</option>
                                    {predefinedMinPrices.map((price, index) => (
                                        <option key={index} value={price}>${price}</option>
                                    ))}
                                </select>

                                {/* fetched prices are then used to populate the dropdown options for selecting minimum and maximum prices. */}

                                {/* <select className="bg-transparent focus:outline-none" value={minPrice} onChange={(e) => setMinPrice(e.target.value)}>
                                    <option value="">Minimum</option>
                                    {predefinedMinPrices.map((price, index) => (
                                        <option key={index} value={price}>${price}</option>
                                    ))}
                                </select> */}
                            </div>
                        </div>


                        <div className="flex flex-col">
                            <label>Max:</label>
                            <div className="border py-3 px-8 my-3 rounded-full">
                                <select className="bg-transparent focus:outline-none" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
                                    <option value="">Maximum</option>
                                    {predefinedMaxPrices.map((price, index) => (
                                        <option key={index} value={price}>${price}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button className="bg-blue text-white w-full px-4 py-2 rounded-full mr-2" onClick={handleApplyFilter}>
                            Apply
                        </button>
                    </div>
                </div>
            </div>)}
        </div>
    );
}

export default PriceRangeFilter;
