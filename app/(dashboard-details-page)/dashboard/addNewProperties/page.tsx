'use client'

import DdHeaderProvider from '@/app/_components/db-header-provider';
import PropertyImageCard from '@/app/_components/organisms/propertyImageCard';
import PropertyListingDetailCard from '@/app/_components/organisms/propertyListingDetailCard';
import DbPropertyOverviewCard from '@/app/_components/organisms/propertyOverviewCard';
import { useEffect, useState } from 'react';
import { postUrl } from '@/app/utils/util';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/molecules/loaders/Spinner';

export interface SharedState {
    DbPropertyOverviewCard: any,
    PropertyListingDetailCard: any,
    PropertyImageCard: any
}

interface DbPropertyOverviewCard {
    name: string;
    description: string;
    type: string;
    rentOrSale: string;
    price: string;
}

interface PropertyListingDetailCard {
    areaKm: string;
    bath: string;
    kitchen: string;
    livingRooms: number;
    rooms: number;
    location: string;
    agent: {}
}

interface PropertyImageCard {
    images: string[]
}

const sharedStateDefault = {
    DbPropertyOverviewCard: {},
    PropertyListingDetailCard: {},
    PropertyImageCard: []
}

const AddNewProperty: React.FC = () => {
    const router = useRouter()
    const [shareState, setShareState] = useState<SharedState>(sharedStateDefault)
    const [loading, setLoading] = useState(false)
    const [showSubmit, setShowSubmit] = useState(false)

    // Save data to local storage
    function saveData(key: keyof SharedState, data: any) {
        localStorage.setItem(key, JSON.stringify(data));
        setShareState((prevState) => ({
            ...prevState,
            [key]: data
        }));
    }

    // Load data from local storage
    function load(key: keyof SharedState) {
        const data = JSON.parse(localStorage.getItem(key) || 'null');
        if (data) {
            setShareState((prevState) => ({
                ...prevState,
                [key]: data
            }));
        }
    }

    useEffect(() => {
        load('DbPropertyOverviewCard');
        load('PropertyListingDetailCard');
        load('PropertyImageCard');
    }, [])

    useEffect(() => {
        const objc1 = shareState.DbPropertyOverviewCard;
        if (objc1 && objc1.name && objc1.description && objc1.type && objc1.rentOrSale && objc1.price) {
            setShowSubmit(true);
        } else {
            setShowSubmit(false);
        }
    }, [shareState.DbPropertyOverviewCard])

    function handleSubmit() {
        const combinedObject = {
            ...shareState.DbPropertyOverviewCard,
            ...shareState.PropertyListingDetailCard,
            images: shareState.PropertyImageCard
        };

        setLoading(true);

        fetch(postUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(combinedObject)
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to submit data');
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setLoading(false);
                router.push("/dashboard/myProperties");
            })
            .catch((error) => {
                console.error('Error submitting data:', error);
                setLoading(false);
            });
    };

    return (
        <DdHeaderProvider header="New Properties">
            <div className="mx-auto container py-6 px-4 md:px-20">
                <div className="space-y-16">
                    <DbPropertyOverviewCard saveData={saveData} existingData={shareState.DbPropertyOverviewCard} />
                    <PropertyListingDetailCard saveData={saveData} existingData={shareState.PropertyListingDetailCard} />
                    <PropertyImageCard saveData={saveData} existingData={shareState.PropertyImageCard} />
                </div>
                {showSubmit && (
                    <button
                        type="submit"
                        disabled={loading}
                        className='disabled:bg-slate-400 disabled:hover:cursor-wait flex items-center justify-center text-white font-bold w-40 bg-blue px-4 py-2 rounded-md mt-8 mb-5'
                        onClick={handleSubmit}
                    >
                        {loading ? <Spinner /> : "Submit Property"}
                    </button>
                )}
            </div>
        </DdHeaderProvider>
    );
};

export default AddNewProperty;

