import { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { GrStatusInfo } from 'react-icons/gr';
import { getAllProperties } from '@/app/utils/util';
import { useQuery } from '@tanstack/react-query';
import { useContext } from "react";
import { AppContext } from "@/store/app-context";

import axios from 'axios';
import { statusFilter } from '@/app/utils/util';

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

// const fetchAndUpdateStatus = async (selectedStats:any, setSelectedStatus:any) => {
//     const { data: statusData } = statusFilter(selectedStats);
//     console.log(statusData, 'statusdata');
//         console.log("hey");


//     setSelectedStatus(statusData);
// };


const StatusFilter: React.FC<{ showstatus: boolean }> = ({ showstatus = false }) => {
    const { setSelectedStatus, selectedStatus } = useContext(AppContext)
    const [selectedStats, setSelectedStats] = useState('');
    const [appliedStats, setAppliedStats] = useState('');
    const { data: statusData } = statusFilter(selectedStats);
    console.log("statusdaa", statusData);
    setSelectedStatus(statusData)
    console.log('state', selectedStatus);

    // const [status, setStatus] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const propertyTypes = ['rent', 'sale', 'Sold'];
    const handleApplyFilter = () => {
        setAppliedStats(selectedStats);
        setIsModalOpen(false);
        showstatus = true
    };

    const handleCancelFilter = () => {
        setAppliedStats('');

    };

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setIsModalOpen(false);
        }
    };

    // useEffect(() => {
    //     fetchAndUpdateStatus(selectedStats, setSelectedStatus);
    // }, [selectedStats, setSelectedStatus]);


    // const { data } = useQuery({
    //     queryKey: ["properties", selectedStats],
    //     queryFn: async () => {
    //         const url = `${getAllProperties}?rentOrSale=${selectedStats}`
    //         const { data } = await axios.get(url)
    //         if (data) {
    //             console.log(data, "data");
    //         }

    //         return data as Property[]
    //     }
    // })


    useEffect(() => {
        document.body.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.body.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("status", JSON.stringify(selectedStats))
        }
    }, [selectedStats])

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
            {showstatus && <h1>hello</h1>}
        </div>
    );
};

export default StatusFilter;
