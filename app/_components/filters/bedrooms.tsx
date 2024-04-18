import { useState, useEffect, useRef } from 'react';
import { FaTimes, FaMinus, FaPlus } from 'react-icons/fa';

const BedroomFilter: React.FC = () => {
    const [numRooms, setNumRooms] = useState(0);
    const [appliedRooms, setAppliedRooms] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const handleApplyFilter = () => {
        setAppliedRooms(numRooms);
        setIsModalOpen(false);
    };

    const handleCancelFilter = () => {
        setNumRooms(appliedRooms);
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

    const handleIncrement = () => {
        setNumRooms((prevNumRooms) => prevNumRooms + 1);
    };

    const handleDecrement = () => {
        if (numRooms > 0) {
            setNumRooms((prevNumRooms) => prevNumRooms - 1);
        }
    };

    return (
        <div>
            {!appliedRooms && (
                <button className="text-blue px-4 py-2 rounded-lg mr-2 border text-sm border-gray-500" onClick={() => setIsModalOpen(true)}>
                    Beds & Baths
                </button>
            )}
            {appliedRooms && (
                <div className="items-center">
                    <button className="text-blue px-4 py-2 rounded-lg mr-2 border text-sm border-gray-500 flex items-center" onClick={handleCancelFilter}>
                        {appliedRooms} + <FaTimes className="ml-2 text-xl" />
                    </button>
                </div>
            )}
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div ref={modalRef} className="bg-white p-4 rounded-lg w-[20%]">

                        <div className="flex justify-center items-center border-b border-gray-200 mb-3 pb-3">
                            <h2 className="text-blue my-4">Beds</h2>
                            <button className="bg-gray-200 text-black px-4 py-2 rounded-full mr-2" onClick={handleDecrement}>
                                <FaMinus />
                            </button>
                            <span>{numRooms} +</span>
                            <button className="bg-blue-500 text-black px-4 py-2 rounded ml-2" onClick={handleIncrement}>
                                <FaPlus />
                            </button>
                        </div>

                        <div className="flex justify-around items-center">
                            <h2 className="text-blue my-4">Baths</h2>
                            <button className="bg-blue-500 text-black px-4 py-2 rounded mr-2" onClick={handleDecrement}>
                                <FaMinus />
                            </button>
                            <span>{numRooms} +</span>
                            <button className="bg-blue-500 text-black px-4 py-2 rounded ml-2" onClick={handleIncrement}>
                                <FaPlus />
                            </button>
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
};

export default BedroomFilter;
