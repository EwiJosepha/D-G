import { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { GrStatusInfo } from 'react-icons/gr';
import { getAllProperties } from '@/app/utils/util';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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


const StatusFilter: React.FC = () => {
    const [selectedStats, setSelectedStats] = useState('');
    const [appliedStats, setAppliedStats] = useState('');
    // const [status, setStatus] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const propertyTypes = ['rent', 'sale', 'Sold'];

    const handleApplyFilter = () => {
        setAppliedStats(selectedStats);
        setIsModalOpen(false);
    };

    const handleCancelFilter = () => {
        setAppliedStats('');
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setIsModalOpen(false);
        }
    };

    const { data } = useQuery({
        queryKey: ["properties",selectedStats],
        queryFn: async () => {
            const url = `${getAllProperties}?rentOrSale=${selectedStats}`
            const { data } = await axios.get(url)
            if (data) {
                console.log(data, "data");
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
        <div>
            {!appliedStats && (
                <button className="text-blue px-4 py-2 rounded-lg mr-2 border text-sm border-gray-500 flex items-center" onClick={() => setIsModalOpen(true)}>
                    <GrStatusInfo className='mr-3 text-lg' />    STATUS
                </button>
            )}
            {appliedStats && (
                <div className=" items-center">
                    <button className="text-blue px-4 py-2 rounded-lg mr-2 border text-sm border-gray-500 flex items-center" onClick={handleCancelFilter}>
                        {appliedStats} <FaTimes className="text-lg ml-2" />
                    </button>
                </div>
            )}
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div ref={modalRef} className="bg-white p-4 rounded-lg w-[20%]">
                        <h2 className="text-sm font-semibold my-4 ">Status</h2>
                        <ul className='grid grid-cols-2 gap-4'>
                            {propertyTypes.map((type) => (
                                <li key={type} className="mb-2">
                                    <button
                                        className={`w-full text-center py-2 px-4 rounded-full ${selectedStats === type ? 'bg-sky-200 text-black' : 'bg-gray-100'}`}
                                        onClick={() => setSelectedStats(type)}
                                    >
                                        {type}
                                    </button>
                                </li>
                            ))}
                        </ul>
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

export default StatusFilter;
