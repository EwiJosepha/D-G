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
        console.log({ [key]: data });
    }

    useEffect(() => {
        console.clear();
        load('DbPropertyOverviewCard')
        load('PropertyListingDetailCard')
        load('PropertyImageCard')
    }, [])


    useEffect(() => {
        if (typeof localStorage !== "undefined") {
            const objc1 = JSON.parse(localStorage.getItem("DbPropertyOverviewCard") as string)
            if (objc1) {
                setShowSubmit(true)
            }
        }

        console.log("show", showSubmit);
    }, [])

    // console.log("shar", shareState);

    function handleSubmit() {
        //desstructure so as to  remove them from objcts

        const destructureObj1: { name: string, description: string, type: string, rentOrSale: string, price: string } = shareState.DbPropertyOverviewCard
        const desstructureObj2: { areaKm: string, bath: string, livingRooms: number, rooms: number, location: string, kitchen: string, agent: string } = shareState.PropertyListingDetailCard

        //obtaining images from propertyImgCard component

        const images = shareState.PropertyImageCard

        //spreading to get all values

        const combinedObject: DbPropertyOverviewCard & PropertyListingDetailCard & PropertyImageCard = {
            ...destructureObj1,
            ...desstructureObj2,
            images
        };


        // if (destructureObj1 && desstructureObj2) {
        //     setShowSubmit(true)
        // }

        // const editableFields : DbPropertyOverviewCard & PropertyListingDetailCard = {
        //     ...destructureObj1,
        //     ...desstructureObj2,
        // }

        // localStorage.setItem("editable", JSON.stringify(editableFields))

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
                    setLoading(true)
                    router.push("/dashboard/myProperties")
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

                    <DbPropertyOverviewCard saveData={saveData} existingData={shareState.DbPropertyOverviewCard} />


                    <PropertyListingDetailCard saveData={saveData} existingData={shareState.PropertyListingDetailCard} />


                    <PropertyImageCard saveData={saveData} existingData={shareState.PropertyImageCard} />

                </div>
                {showSubmit && <button type="submit"
                    disabled={loading} className='disabled:bg-slate-400 disabled:hover:cursor-wait flex items-center justify-center text-white font-bold w-40 bg-blue px-4 py-2 rounded-md mt-8 mb-5' onClick={handleSubmit}>{loading ? <Spinner /> : "Submit Property"}</button>
                }

            </div>
        </DdHeaderProvider>
    );
};

export default AddNewProperty;
