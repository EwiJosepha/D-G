import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FaBedPulse } from 'react-icons/fa6';
import { FiMinus, FiPlus } from 'react-icons/fi';
import axios from 'axios';
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

const BedBathFilter: React.FC = () => {
    const [numBeds, setNumBeds] = useState(0);
    const [numBaths, setNumBaths] = useState(0)
    const [appliedRooms, setAppliedRooms] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const handleApplyFilter = () => {
        setAppliedRooms(`${numBeds}  + Beds, ${numBaths} + Baths`);
        setIsModalOpen(false);
    };
    console.log(numBeds, numBaths)

    const handleCancelFilter = () => {
        setNumBeds(0);
        setNumBaths(0);
        setAppliedRooms('');
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


    const handleIncrement = (type: 'beds' | 'baths') => {
        if (type === 'beds') {

            setNumBeds((prevNumBeds) => prevNumBeds + 1)
        } else if (type === 'baths') {
            setNumBaths((prevNumBaths) => prevNumBaths + 1)
        }
    }

    const handleDecrement = (type: 'beds' | 'baths') => {
        if (type === 'beds') {
            if (numBeds > 0) {
                setNumBeds((prevNumBeds) => prevNumBeds - 1);
            }
        } else if (type === 'baths') {
            if (numBaths > 0) {
                setNumBaths((prevNumBaths) => prevNumBaths - 1);
            }
        }
    };



    const { data } = useQuery({
        queryKey: ["properties", numBaths, numBeds],
        queryFn: async () => {
            const url = `${getAllProperties}?bath=${numBaths}&rooms=${numBeds}`
            const { data } = await axios.get(url)
            if (data) {
                console.log(data, "data");
            }

            return data as Property[]
        }
    })


    return (
        <div className='text-blue'>
            {!appliedRooms && (
                <button className=" px-4 py-2 rounded-lg mr-2 border text-sm border-gray-500 flex items-center" onClick={() => setIsModalOpen(true)}>
                    <FaBedPulse className='mr-2 text-lg' />  BEDS & BATHS
                </button>
            )}
            {appliedRooms && (
                <div className="items-center">

                    <button className=" px-4 py-2 rounded-lg mr-2 border text-sm border-gray-500 flex items-center" onClick={handleCancelFilter}>
                        {numBeds > 0 && `${numBeds} Beds`} {numBeds > 0 && numBaths > 0 && ','} {numBaths > 0 && `${numBaths} Baths`} <FaTimes className="text-lg ml-2" />
                    </button>
                </div>
            )}
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div ref={modalRef} className="bg-white p-4 rounded-lg w-[20%]">

                        <div className="flex justify-around items-center border-b border-gray-200 mb-3 pb-3">
                            <h2 className=" my-4">Beds</h2>
                            <button className="bg-gray-200 p-2 rounded-full" onClick={() => handleDecrement('beds')}>
                                <FiMinus />
                            </button>
                            <span>{numBeds > 0 ? `${numBeds} +` : 'Any'}</span>
                            <button className="bg-gray-200 p-2 rounded-full ml-2" onClick={() => handleIncrement('beds')}>
                                <FiPlus />
                            </button>
                        </div>

                        <div className="flex justify-around items-center">
                            <h2 className=" my-4">Baths</h2>
                            <button className="bg-gray-200 p-2 rounded-full" onClick={() => handleDecrement('baths')}>
                                <FiMinus />
                            </button>
                            <span>{numBaths > 0 ? `${numBaths} +` : 'Any'}</span>

                            <button className="bg-gray-200 p-2 rounded-full ml-2" onClick={() => handleIncrement('baths')}>
                                <FiPlus />
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

export default BedBathFilter;
