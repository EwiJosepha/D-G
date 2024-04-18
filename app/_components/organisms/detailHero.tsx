'use client'
import React, { useState } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { usePathname } from 'next/navigation';
import { getOneProperty } from '@/app/utils/util';

const DetailHero: React.FC = () => {
    const pathName = usePathname();
    const pathVal = +pathName.split('/')[2]
    const pathValstring = pathName.split('/')[2]
    const { data } = getOneProperty(pathVal)

    const dataFromQuery: { name: string, areaInKm: number, location: string, livingRooms: string, price: number, bath: number, rooms: string, rentOrSale: string, description: string, images: [] } = data

    const images = dataFromQuery?.images || [];

    const [currentImage, setCurrentImage] = useState(0);
    const previousImage = () => {
        if (dataFromQuery && dataFromQuery.images) {
            setCurrentImage((prevState) =>
                prevState === 0 ? dataFromQuery.images.length - 1 : prevState - 1
            );
        }
    };

    const nextImage = () => {
        if (dataFromQuery && dataFromQuery.images) {
            setCurrentImage((prevState) =>
                prevState === dataFromQuery.images.length - 1 ? 0 : prevState + 1
            );
        }
    };


    return (
        <div className="relative">
            <button
                className="absolute top-1/2 left-7 transform -translate-y-1/2 px-4 py-4 bg-black bg-opacity-50 font-bold border-4 border-white rounded-full"
                onClick={previousImage}
            >
                <GrPrevious className="text-white" />
            </button>
            <img
                className="h-[85vh] w-full object-cover top-0 cursor-pointer hover:transition-opacity"
                src={images[currentImage]}
                alt="Carousel Image"
            />
            <button
                className="absolute top-1/2 right-7 transform -translate-y-1/2 px-4 py-4 bg-black bg-opacity-50 font-bold border-4 border-white rounded-full"
                onClick={nextImage}
            >
                <GrNext className="text-white" />
            </button>

            <div className="mt-3 flex justify-center">
                {images.map((image, index) => (
                    <img
                        key={index}
                        className={`w-full h-24 object-cover mx-2 cursor-pointer ${index === currentImage ? 'border-2' : ''
                            }`}
                        src={image}
                        alt="Thumbnail"
                        onClick={() => setCurrentImage(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default DetailHero;