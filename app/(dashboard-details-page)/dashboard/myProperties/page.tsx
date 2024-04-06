'use client'

import DdHeaderProvider from '@/app/_components/db-header-provider';
import DropDownCard from '@/app/_components/organisms/dropDownCard';
import React from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { propertiesForAgent } from '@/app/utils/util';
import Link from 'next/link';

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
    const [selectedPropertyId, setSelectedPropertyId] = React.useState<number | null>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['propWithAgentId'],
        queryFn: async () => {
            const { data } = await axios.get(propertiesForAgent)
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

    if (data?.length === 0) {
        return <div><h1>Upload property</h1></div>
    }


    return (
        <DdHeaderProvider header="My Properties">
            <>
                <div className="mt-10 p-6 overflow-x-scroll md:overflow-hidden">
                    <table className="container mb-10">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="py-2">Title</th>
                                <th className="py-2">Date</th>
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
                                                <img src={property.images[1]} alt="Property" className="w-20 h-20 rounded-lg mr-3" />
                                                <div className="flex flex-col space-y-2">
                                                    <span className="cursor-pointer hover:text-orange-500">{property.name}</span>
                                                    <span className="text-gray-400 text-sm cursor-pointer">{property.location}</span>
                                                    <span className="cursor-pointer">{property.price}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="px-4 py-2">{property.description}</td>
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
                </div>
            </>
        </DdHeaderProvider>
    );
};

export default MyProperties;