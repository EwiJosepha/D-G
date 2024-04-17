'use client'
// const dynamic = "force-dynamic"

import DdHeaderProvider from '@/app/_components/db-header-provider';
import DropDownCard from '@/app/_components/organisms/dropDownCard';
import React, { useState } from 'react';
import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { propertiesForAgent } from '@/app/utils/util';
import Link from 'next/link';
import { FaLocationPin } from 'react-icons/fa6';
import Spinner from '@/components/molecules/loaders/Spinner';
import Image from 'next/image';

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

const MyProperties: React.FC = () => {
    const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
    const [dataLen, setDataLen] = useState(false)
    const [selectedPropertyId, setSelectedPropertyId] = React.useState<number | null>(null);
    const [dataLen, setDataLen] = useState(false)
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['propWithAgentId'],
        queryFn: async () => {
            const { data } = await axios.get(propertiesForAgent)
            const datalen = data.length
            if (datalen === 0) {
                setDataLen(true)
            }
            return data as Property[]
        }
    })

    const handleActionClick = (propertyId: number) => {
        if (selectedPropertyId === propertyId) {
            setIsDropdownVisible((prevState) => !prevState);
        } else {
            setIsDropdownVisible(true);
            setSelectedPropertyId(propertyId);
        }
        if (typeof localStorage !== 'undefined') {
            const uptPropId = localStorage.setItem('propId', JSON.stringify(propertyId))
        }
    };

    if (isLoading) {
        return <Spinner />;
    }




    return (

        <DdHeaderProvider header="My Properties">
            {
                dataLen && (
                    <div className="flex flex-col items-center justify-center h-96">
                        <h1 className="text-2xl text-red-500 font-bold mb-20">😐 Sorry, You Don't have any Listings Uploaded</h1>
                        <Link href="/dashboard/addNewProperties">
                            <button className="bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
                                Create New Listing
                            </button>
                        </Link>
                    </div>
                )
            }
            <>
                {!dataLen && (<div className="mt-10 p-6 overflow-x-scroll md:overflow-hidden">
                    <table className="container mb-10">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="py-2">Title</th>
                                <th className="py-2">Description</th>
                                <th className="py-2">Status</th>
                                <th className="py-2 ">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((property) => (

                                <tr key={property.id} className="border-b-2">
                                    <td className="px-4 py-6">
                                        <Link href={`/details/${property.id}`}>
                                            <div className="flex cursor-pointer">
                                                <img src={property.images[1]} alt="Property" className="w-28 h-24 rounded-lg mr-3" />
                                                <div className="flex flex-col space-y-2">
                                                    <span className="cursor-pointer hover:text-orange-500">{property.name}</span>
                                                    <span className="text-gray-400 flex items-center text-sm cursor-pointer"><FaLocationPin className='mr-2 text-blue' />{property.location}</span>
                                                    <span className="cursor-pointer">${property.price}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="px-4 py-2 w-[45%]">{property.description}</td>
                                    <td className="px-4 py-2">{property.rentOrSale}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center">
                                            <button
                                                className="text-gray-500 focus:outline-none"
                                                onClick={() => handleActionClick(property.id)}
                                            >
                                                <FiMoreVertical size={20} />
                                            </button>
                                            {selectedPropertyId === property.id && (
                                                <div className="absolute right-24" ref={dropdownRef}>
                                                    <DropDownCard />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>)}
            </>
        </DdHeaderProvider>
    );
};

export default MyProperties;