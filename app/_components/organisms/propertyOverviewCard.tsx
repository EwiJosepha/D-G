"use-client"

import React, { useState } from 'react'
import Toast from '../molecules/toast';
import { SharedState } from '@/app/(dashboard-details-page)/dashboard/addNewProperties/page';
import { toast } from 'react-toastify';
type Prop = {
    name: string;
    type: string;
    description: string;
    price: number;
    rentOrSale: string;
}

export interface ComponentProps {
    saveData: (key: keyof SharedState, data: any) => void;
    existingData: any
}

const DbPropertyOverviewCard: React.FC<ComponentProps> = ({ saveData, existingData }) => {
    const [error, setError] = useState<string>('');
    const [disable, setDisable] = useState(false)
    const notify = () => toast.success("Save Property successfully")

    const [propertyInfo, setPropertyInfo] = useState<Prop>({
        name: "",
        type: "",
        description: "",
        price: 0,
        rentOrSale: "",
    })

    // type DbPropertyOverviewCard = Omit<IPropertyInfo, 'name' | 'type' | 'description' | 'price' | 'rentOrSale'>;

    // type T = Partial<IProfileInfo>

    const [data, setData] = useState<Prop>(existingData || propertyInfo)

    const handleInputChangee = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPropertyInfo((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            name: value,
        }));

        setData((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            name: value,
        }));

        setError('')

    };
    const handleInputChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPropertyInfo((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            price: parseFloat(value),
        }));
        setData((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            price: parseFloat(value),
        }));

        setError('')
    };

    console.log(propertyInfo);

    const handleTexarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setPropertyInfo((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            description: value,
        }))
        setData((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            description: value,
        }))
        setError('')
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setPropertyInfo((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            type: value,

        }));
        setData((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            type: value,

        }));

        setError('')
    };
    const handleSelectChangeRent = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setPropertyInfo((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            rentOrSale: value,

        }));

        setData((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            rentOrSale: value,

        }));
        setError('')
    };

    function save() {
        if (propertyInfo.description === "") {
            setError('Field is required*')
            return
        }

        if (propertyInfo.name === '') {
            setError('Field is required*')
            return
        }
        if (!propertyInfo.price) {
            setError('Field is required*')
            return
        }
        if (propertyInfo.rentOrSale === '') {
            setError('Field is required*')
            return
        }

        saveData('DbPropertyOverviewCard', data)
        notify()
        setDisable(true)

    }

    return (
        <div className="mt-4 p-4 shadow shadow-blue rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Overview</h3>
            <div className="mb-4">
                <label htmlFor="propertyTitle" className="block">
                    Property Name*
                </label>
                <input
                    type="text"
                    id="propertyTitle"
                    className="border border-gray-200 px-4 py-3 rounded-md w-full"
                    onChange={handleInputChangee}
                    required
                />
                {error && <p className="text-red-500 text-sm py-2">{error}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="propertyDescription" className="block">
                    Description*
                </label>
                <textarea
                    onChange={handleTexarea}
                    id="propertyDescription"
                    className="border border-gray-200 px-4 py-3 rounded-md w-full"
                    required
                ></textarea>
                {error && <p className="text-red-500 text-sm py-2">{error}</p>}

            </div>


            <div className='flex justify-between'>
                <div className="mb-4 w-[45%]">
                    <label htmlFor="propertyCategory" className="block">
                        Property Type*
                    </label>
                    <select className="border border-gray-200 px-4 py-3 rounded-md w-full"
                        onChange={handleSelectChange}>

                        <option value=''></option>
                        <option value='apartment'>Apartment</option>
                        <option value='studios'>Studios</option>
                        <option value='house'>House</option>
                        <option value='villas'>Villas</option>
                        <option value='self-contain'>Self Contain</option>
                    </select>
                    {error && <p className="text-red-500 text-sm py-2">{error}</p>}

                </div>
                <div className="mb-4 w-[45%]">
                    <label htmlFor="listedIn" className="block">
                        Listed in*
                    </label>
                    <select className="border border-gray-200 px-4 py-3 rounded-md w-full"
                        onChange={handleSelectChangeRent}>
                        <option value="">All Listings</option>
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                        <option value="rent">Rent</option>
                    </select>
                    {error && <p className="text-red-500 text-sm py-2">{error}</p>}

                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="propertyPrice" className="block">
                    Price*($)
                </label>
                <input
                    type="text"
                    id="propertyPrice"
                    className="border border-gray-200 px-4 py-3 rounded-md w-full"
                    onChange={handleInputChangePrice}
                    required
                />
            </div>
            {error && <p className="text-red-500 text-sm py-2">{error}</p>}
            <button disabled={disable} className='text-white w-40 bg-blue px-4 py-2 rounded-md mt-5 mb-3' onClick={save}>Save</button>
            <Toast/>
        </div>
    );
};

export default DbPropertyOverviewCard
