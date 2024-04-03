'use client'

import DdHeaderProvider from '@/app/_components/db-header-provider';
import PropertyImageCard from '@/app/_components/organisms/propertyImageCard';
import PropertyListingDetailCard from '@/app/_components/organisms/propertyListingDetailCard';
import DbPropertyOverviewCard from '@/app/_components/organisms/propertyOverviewCard';
import { useEffect, useState } from 'react';
import { postUrl } from '@/app/utils/util';

export interface SharedState {
    DbPropertyOverviewCard: any,
    PropertyListingDetailCard: any,
    // component3: any
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
    bath: number;
    livingRooms: number;
    rooms: number;
    location: string;
}

const sharedStateDefault = {
    DbPropertyOverviewCard: {},
    PropertyListingDetailCard: {},
    // component3:{}
}
const AddNewProperty: React.FC = () => {
    const [shareState, setShareState] = useState<SharedState>(sharedStateDefault)

    //save to localstorage

    function saveData(key: keyof SharedState, data: any) {
        const items = localStorage.setItem(key, JSON.stringify(data))

        setShareState((prevState) => ({
            ...prevState,
            [key]: data
        }))
    }

    //function to load data from ls

    function load(key: keyof SharedState) {
        const data = JSON.parse(localStorage.getItem(key) as any)

        if (data) {
            setShareState((prevState) => ({
                ...prevState,
                [key]: data
            }))
        }
    }

    useEffect(() => {
        load('DbPropertyOverviewCard')
        load('PropertyListingDetailCard')
        // load('componentData3')
    }, [])

    console.log("shar", shareState);




    function handleSubmit() {

        // const combinedData = {
        //     DbPropertyOverviewCard: shareState.DbPropertyOverviewCard,
        //     PropertyListingDetailCard: shareState.PropertyListingDetailCard

        // }

        // console.log(combinedData);


        const destructureObj1: { name: string, description: string, type: string, rentOrSale: string, price: string } = shareState.DbPropertyOverviewCard

        const desstructureObj2: { areaKm: string, bath: number, livingRooms: number, rooms: number, location: string } = shareState.PropertyListingDetailCard

        console.log("spread", destructureObj1);
        console.log("spread2", desstructureObj2)


        const combinedObject: DbPropertyOverviewCard & PropertyListingDetailCard = {
            ...destructureObj1,
            ...desstructureObj2
        };

        console.log("combinedObject", combinedObject);


        const reqBody = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(combinedObject)
        };

        fetch(postUrl, reqBody)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to submit data');
                }
                return res.json();
            })
            .then((data) => {
                if (data.status === 201) {
                    console.log('Created successfully');
                } else if (data.status === 200) {
                    console.log('Incomplete data or information');
                } else {
                    console.log(data);
                }
            })
            .catch((error) => {
                console.error('Error submitting data:', error);
            });

        console.log(combinedObject);
    };
    return (
        <DdHeaderProvider header="New Properties">
            <div className="mx-auto container py-6 px-4 md:px-20">

                <div className="space-y-16">
                    {/* Overview Card */}
                    <DbPropertyOverviewCard saveData={saveData} existingData={shareState.DbPropertyOverviewCard} />

                    {/* Listing Details Card */}
                    <PropertyListingDetailCard saveData={saveData} existingData={shareState.PropertyListingDetailCard} />

                    {/* Photo and Video Upload Card */}
                    <PropertyImageCard />



                </div>
                <button type="submit" className='text-white font-bold w-40 bg-blue px-4 py-2 rounded-md mt-8 mb-5' onClick={handleSubmit}>Submit Property</button>
            </div>
        </DdHeaderProvider>
    );
};

export default AddNewProperty;
