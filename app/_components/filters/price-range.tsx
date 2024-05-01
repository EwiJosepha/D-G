'use client'

import React, { useRef, useState, useEffect } from "react";
import { FaDollarSign, FaTimes } from "react-icons/fa";
import { useAppContext } from "@/store/app-context";

const PriceRangeFilter: React.FC = () => {
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(0);
    const [appliedRange, setAppliedRange] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    

    const { setFilters, filters } = useAppContext()

    const predefinedMinPrices = [50, 100, 200, 500, 1000, 5000, 10000, 50000, 100000, 500000];
    const predefinedMaxPrices = [500000, 700000, 1000000, 1500000, 2000000, 5000000, 7500000, 10000000];

    const handleApplyFilter = () => {
        setIsModalOpen(false);
        setFilters(prevFilters => ({ ...prevFilters, price: minPrice }))
    };
    // `${minPrice}-${maxPrice}`

    const handleCancelFilter = () => {
        setMinPrice(0);
        setMaxPrice(0);
        setAppliedRange('');
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setIsModalOpen(false);
        }
    };

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
                <div ref={modalRef} className="bg-white p-4 rounded-lg md:w-[23%] w-full mx-2 md:mx-0">
                    <h1 className="my-6 font-bold">Price Range</h1>

                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">

                            <label>Min:</label>
                            <div className="border py-3 px-3 md:px-8 my-3 rounded-full">

                                <select className="bg-transparent focus:outline-none" value={minPrice} onChange={(e) => setMinPrice(parseInt(e.target.value))}>
                                    <option value="">Mininum</option>
                                    {predefinedMinPrices.map((price, index) => (
                                        <option key={index} value={price}>${price}</option>
                                    ))}
                                </select>
                            </div>
                        </div>


                        <div className="flex flex-col">
                            <label>Max:</label>
                            <div className="border py-3 px-3 md:px-8 my-3 rounded-full">
                                <select className="bg-transparent focus:outline-none" value={maxPrice} onChange={(e) => setMaxPrice(parseInt(e.target.value))}>
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
