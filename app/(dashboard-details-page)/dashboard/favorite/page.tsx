'use client'

import DdHeaderProvider from "@/app/_components/db-header-provider";
import Card from "@/app/_components/organisms/card";
import React from "react";
import Link from "next/link";

const properties = [
    {
        id: 1,
        image: 'card1.webp',
        listing: 'Apartment/Rent',
        price: '$2000',
        agent: 'John Doe',
        avatar: 'av1.jpg',
    },
    {
        id: 2,
        image: 'card2.webp',
        listing: 'House/Sell',
        price: '$500000',
        agent: 'Jane Smith',
        avatar: 'av2.jpg',
    },
    {
        id: 3,
        image: 'card3.webp',
        listing: 'Studio/Sell',
        price: '$50000',
        agent: 'Jane Smith',
        avatar: 'img1.webp',
    },
    {
        id: 4,
        image: 'card4.jpg',
        listing: 'Apartment/Rent',
        price: '$35,600',
        agent: 'Young Filz',
        avatar: 'av3.jpg',
    },
    {
        id: 5,
        image: 'card5.jpg',
        listing: 'House/Sell',
        price: '$19,000',
        agent: 'Moses Aloyr',
        avatar: 'av4.jpg',
    },
    {
        id: 6,
        image: 'card6.jpg',
        listing: 'Studio/Sell',
        price: '$980,000',
        agent: 'Daisy Smith',
        avatar: 'av5.jpg',
    },
];

const Favorite: React.FC = () => {
    return (
        <DdHeaderProvider header="Favorites">
            <div className="py-10 px-10 bg-blue">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 object-cover">
                    {properties.map((property) => (
                        (<Link href={`/property/${property.id}`} key={property.id} legacyBehavior>
                            <div className="bg-white p-1 rounded-lg">
                                {/* <Card
                                    id={property.id}
                                    image={property.image}
                                    listing={property.listing}
                                    price={property.price}
                                    agent={property.agent}
                                    avatar={property.avatar}
                                    isFavorite={true}
                                    onToggleFavorite={() => { }}
                                /> */}
                            </div>

                        </Link>)
                    ))}
                </div>
            </div>
        </DdHeaderProvider>
    )
}
export default Favorite