'use client'

import { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useAppContext } from '@/store/app-context';
import Image from 'next/image';

const PropertySizeFilter: React.FC = () => {
    const [minSize, setMinSize] = useState<number>(0);
    const [maxSize, setMaxSize] = useState<number>(0);
    const [appliedSize, setAppliedSize] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const { setFilters } = useAppContext();

    const predefinedMinSizes = [100, 150, 200, 300, 400, 500, 700, 1000];
    const predefinedMaxSizes = [1000, 1500, 2000, 2500, 3500, 5000, 10000];

    const handleApplyFilter = () => {
        setIsModalOpen(false);
        setFilters(prevFilters => ({ ...prevFilters, areaInKm: minSize }));
    };

    const handleCancelFilter = () => {
        setMinSize(0);
        setMaxSize(0);
        setAppliedSize('');
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
            {!appliedSize && (
                <button className="px-2 py-1 rounded-lg mr-2 border text-sm border-gray-500 flex items-center" onClick={() => setIsModalOpen(true)}>
                    <Image src='/m2.png' width={30} height={30} alt="m2" /> METER SQUARE
                </button>
            )}
            {appliedSize && (
                <div className="items-center">
                    <button className="px-4 py-2 rounded-lg mr-2 border text-sm border-gray-500 flex items-center" onClick={handleCancelFilter}>
                        {minSize && `${minSize} m²`}{maxSize && ` - ${maxSize} m²`} <FaTimes className="text-lg ml-2" />
                    </button>
                </div>
            )}
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div ref={modalRef} className="bg-white p-4 rounded-lg md:w-[23%]">
                        <h1 className="my-6 font-bold">Meter Square</h1>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <label>Min:</label>
                                <div className="border py-3 px-8 my-3 rounded-full">
                                    <select className="bg-transparent focus:outline-none" value={minSize} onChange={(e) => setMinSize(parseInt(e.target.value))}>
                                        <option value="">Minimum</option>
                                        {predefinedMinSizes.map((size, index) => (
                                            <option key={index} value={size}>{size}   m² </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label>Max:</label>
                                <div className="border py-3 px-8 my-3 rounded-full">
                                    <select className="bg-transparent focus:outline-none" value={maxSize} onChange={(e) => setMaxSize(parseInt(e.target.value))}>
                                        <option value="">Maximum</option>
                                        {predefinedMaxSizes.map((size, index) => (
                                            <option key={index} value={size}>{size}   m² </option>
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
                </div>
            )}
        </div>
    );
}

export default PropertySizeFilter;
