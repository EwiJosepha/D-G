'use client'

import DdHeaderProvider from '@/app/_components/db-header-provider';
import React, { useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { CiBookmarkMinus } from 'react-icons/ci';
import { FaEye, FaHeart } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { propertiesForAgent } from '@/app/utils/util';
import axios from 'axios';

const data = [
    { label: 'Label 1', value: 4 },
    { label: 'Label 2', value: 9 },
    { label: 'Label 3', value: 12 },
    { label: 'Label 4', value: 18 },
    { label: 'Label 5', value: 19 },
    { label: 'Label 6', value: 2 },
];

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

const Dashboard: React.FC = () => {
    const maxValue = Math.max(...data.map((item) => item.value));
    const [dataLength, setDataLength] = useState(Number)
    const { data: dataforAgent, isLoading, isError } = useQuery({
        queryKey: ['propWithAgentId'],
        queryFn: async () => {
            const { data } = await axios.get(propertiesForAgent)
            const dataLength = data.length
            setDataLength(dataLength)
            return data as Property[]
        }
    })

    return (
        <DdHeaderProvider header="Dashboard" only_header>
            <>
                <div className='bg-blue pb-20'>
                    <div className=' hidden md:block bg-white py-7 px-8 rounded-lg mb-10'>
                        <ul className='flex justify-between items-center'>
                            <li className='text-gray-400'>All Properties <br /><span className='font-serif text-3xl font-bold text-black'>{dataLength}+</span></li>
                            <li className='text-5xl font-bold'><BsPersonCircle /></li>
                            <li className='text-gray-400'>Total Pending <br /><span className='font-serif text-3xl font-bold text-black'>03</span></li>
                            <li className='text-2xl bg-black p-4 rounded-full text-white font-bold'><CiBookmarkMinus /></li>
                            <li className='text-gray-400'>Total Views <br /><span className='font-serif text-3xl font-bold text-black'>4.8K</span></li>
                            <li className='text-2xl bg-black p-4 rounded-full text-white font-bold'><FaEye /></li>
                            <li className='text-gray-400'>Total Favorites<br /> <span className='font-serif text-3xl font-bold text-black'>06</span></li>
                            <li className='text-2xl bg-black p-4 rounded-full text-white font-bold'><FaHeart /></li>
                        </ul>
                    </div>
                    <div className='md:flex'>

                        <div className="bg-white p-2 rounded-lg w-full md:w-[58%] mr-10 mb-6 md:mb-0">
                            <h1 className="pt-4 pb-8 font-bold text-2xl pl-4">Property Overview</h1>
                            <div className="space-y-2">
                                {data.map((item) => (
                                    <div key={item.label} className="flex text-xs items-center">
                                        <div className=" pl-3 w-14 mb-7">{item.label}</div>
                                        <div className="flex-1 bg-gray-200 rounded-lg mb-7">
                                            <div
                                                className="h-5 bg-orange-300 rounded-lg"
                                                style={{ width: `${(item.value / maxValue) * 100}%` }}
                                            ></div>
                                        </div>
                                        <div className="w-10 pr-3 text-right mb-7">{item.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='container bg-white rounded-lg md:w-[38%] py-2 px-4'>
                            <h1 className='text-2xl font-bold font-serif py-4'>Recent Message</h1>

                            <div className='border-b-2 border-gray-200 pl-6 space-y-2'>
                                <p className='text-gray-500 text-sm'>Samuel Roi. <span className='ml-60'> FEB 22</span></p>
                                <h2 className='font-mono'>Work Inquiry from Rebase</h2>
                                <p className='text-gray-500 text-sm pb-4'>Hello am Samuel from Rebase offering web development course.</p>
                            </div>

                            <div className='border-b-2 border-gray-200 pl-6 space-y-2'>
                                <p className='text-gray-500 text-sm pt-4'>Gael Kelz.. <span className='ml-60'> MAY 23</span></p>
                                <h2 className='font-mono'>Product Designer Opportunities</h2>
                                <p className='text-gray-500 text-sm pb-4'>Gael from Opportunity Corners great Job.</p>
                            </div>

                            <div className='pl-6 space-y-2'>
                                <p className='text-gray-500 text-sm pt-4'>Demian Josh. <span className='ml-60'> JAN 24</span></p>
                                <h2 className='font-mono'>Hunting Marketing Specialist</h2>
                                <p className='text-gray-500 text-sm pb-4'>Hello, This is Demian from HuntX. We offer the best business solution to our client...</p>
                            </div>

                        </div>
                    </div>

                </div>
            </>
        </DdHeaderProvider>
    );
};

export default Dashboard;