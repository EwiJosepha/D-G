import React, { useRef, useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const PropertySizeFilter: React.FC = () => {
    const [minSize, setMinSize] = useState('');
    const [maxSize, setMaxSize] = useState('');
    const [appliedSize, setAppliedSize] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    // fetch predefined prices from the backend 
    // const [predefinedMinSizes, setPredefinedMinSizes] = useState<number[]>([]);
    // const [predefinedMaxSizes, setPredefinedMaxSizes] = useState<number[]>([]);

    // useEffect(() => {
    //     // Fetch predefined prices from backend when component mounts
    //     fetchPredefinedPrices();
    // }, []);

    // const fetchPredefinedPrices = async () => {
    //     try {
    //         // Make an HTTP GET request to your backend API to fetch predefined prices
    //         const response = await fetch('your-backend-url/predefined-prices');
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch predefined prices');
    //         }
    //         const data = await response.json();
    //         // Update state with fetched predefined prices
    //         setPredefinedMinSizes(data.predefinedMinSizes);
    //         setPredefinedMaxSizes(data.predefinedMaxSizes);
    //     } catch (error) {
    //         console.error('Error fetching predefined prices:', error);
    //     }
    // };

    const predefinedMinSizes = [100, 150, 200, 300, 400, 500, 700, 1000];
    const predefinedMaxSizes = [1000, 1500, 2000, 2500, 5000, 10000];

    const handleApplyFilter = () => {
        setAppliedSize(`${minSize} m² - ${maxSize} m²`);
        setIsModalOpen(false);
        // filter search here
    };


    const handleCancelFilter = () => {
        setMinSize('');
        setMaxSize('');
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
                <button className="px-4 py-2 rounded-lg mr-2 border text-sm border-gray-500" onClick={() => setIsModalOpen(true)}>
                    Meter Square
                </button>
            )}
            {appliedSize && (
                <div className="items-center">
                    <button className="px-4 py-2 rounded-lg mr-2 border text-sm border-gray-500 flex items-center" onClick={handleCancelFilter}>
                        {minSize && `${minSize} m²`}{maxSize && ` - ${maxSize} m²`} <FaTimes className="text-lg ml-2" />
                    </button>
                </div>
            )}
            {isModalOpen && (<div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                <div ref={modalRef} className="bg-white p-4 rounded-lg md:w-[23%]">
                    <h1 className="my-6 font-bold">Meter Square</h1>

                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">

                            <label>Min:</label>
                            <div className="border py-3 px-8 my-3 rounded-full">

                                <select className="bg-transparent focus:outline-none" value={minSize} onChange={(e) => setMinSize(e.target.value)}>
                                    <option value="">Mininum</option>
                                    {predefinedMinSizes.map((price, index) => (
                                        <option key={index} value={price}>{price}   m² </option>
                                    ))}
                                </select>

                                {/* fetched prices are then used to populate the dropdown options for selecting minimum and maximum prices. */}

                                {/* <select className="bg-transparent focus:outline-none" value={minSize} onChange={(e) => setMinSize(e.target.value)}>
                                    <option value="">Minimum</option>
                                    {predefinedMinSizes.map((price, index) => (
                                        <option key={index} value={price}>{price}   m² </option>
                                    ))}
                                </select> */}
                            </div>
                        </div>


                        <div className="flex flex-col">
                            <label>Max:</label>
                            <div className="border py-3 px-8 my-3 rounded-full">
                                <select className="bg-transparent focus:outline-none" value={maxSize} onChange={(e) => setMaxSize(e.target.value)}>
                                    <option value="">Maximum</option>
                                    {predefinedMaxSizes.map((price, index) => (
                                        <option key={index} value={price}>{price}   m² </option>
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

export default PropertySizeFilter;
