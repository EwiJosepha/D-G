import React, { useState } from "react";
import { SharedState } from "@/app/(dashboard-details-page)/dashboard/addNewProperties/page";
import { ComponentProps } from "./propertyOverviewCard";
import { parsedId } from "@/app/utils/util";
import Toast from "../molecules/toast";
import { toast } from 'react-toastify';


type Prop = {
    rooms: string;
    bath: string;
    livingRooms: string;
    location: string;
    kitchen: string;
    areaInKm: string;
    shortDescription: string;
    agentId: number;
}

const PropertyListingDetailCard: React.FC<ComponentProps> = ({ saveData, existingData }) => {
    const [error, setError] = useState<string>('');
    const [disable, setDisable] = useState(false)
    const notify = () => toast.success("Save Property successfully")


    const [propertyInfo, setPropertyInfo] = useState<Prop>({
        rooms: "",
        bath: "",
        livingRooms: "",
        location: "",
        kitchen: "",
        areaInKm: "",
        shortDescription: "",
        agentId: parsedId,
    })

    const [data, setData] = useState<Prop>(existingData || propertyInfo)

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setPropertyInfo((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            bath: value,
        }));

        setData((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            bath: value,

        }));
        setError('')
    };

    const handleSelectChangelivingRooms = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setPropertyInfo((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            livingRooms: value,
        }));
        console.log(value);


        setData((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            livingRooms: value,
        }));

        setError('')
    };

    const handleSelectChangekitchen = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setPropertyInfo((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            kitchen: value,
        }));

        setData((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            kitchen: value,
        }));
        setError('')
    };
    const handleSelectChangeRooms = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setPropertyInfo((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            rooms: value,
        }));

        setData((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            rooms: value,
        }));
        setError('')
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPropertyInfo((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            areaInKm: value,
        }));

        setData((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            areaInKm: value,
        }));
        setError('')
    };

    const handleInputChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPropertyInfo((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            location: value
        }));
        setData((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            location: value
        }));

        setError('')
    }

    function save() {
        if (propertyInfo.areaInKm === '') {
            setError('Please fill this field')
            return
        }

        if (propertyInfo.livingRooms === '') {
            setError('Please fill this field')
            return
        }
        if (propertyInfo.location === '' && propertyInfo.location.length > 50) {
            setError('Field is required*')
            return
        }
        if (propertyInfo.kitchen === "") {
            setError('Field is required*')
            return
        }
        if (propertyInfo.rooms === "") {
            setError('Field is required*')
            return
        }
        if (propertyInfo.bath === '') {
            setError('Field is required*')
            return
        }

        saveData('PropertyListingDetailCard', {
            ...data,
            agentId: propertyInfo.agentId,
        });

        notify()
        setDisable(true)

    }
    // console.log("com", propertyInfo);


    return (
        <div className="p-4 shadow shadow-blue rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Listing Details</h3>

            <div className='flex justify-between items-center'>
                <div className="my-4 w-[45%]">
                    <label htmlFor="propertySize" className="block">
                        Surface Area in ft*
                    </label>
                    <input
                        type="text"
                        id="propertySize"
                        className="border border-gray-200 px-4 py-3 rounded-md w-full"
                        onChange={handleInputChange}
                        required
                    />
                    {error && <p className="text-red-500 text-sm py-2">{error}</p>}
                </div>

                <div className="mb-4 w-[45%]">
                    <label htmlFor="bedrooms" className="block">
                        Bedrooms*
                    </label>
                    <select className="border border-gray-200 px-4 py-3 rounded-md w-full" onChange={handleSelectChangeRooms}>
                        <option value="">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    {error && <p className="text-red-500 text-sm py-2">{error}</p>}

                </div>
            </div>
            <div className='flex justify-between'>
                <div className="mb-4 w-[45%]">
                    <label htmlFor="bathrooms" className="block">
                        Bathrooms*
                    </label>
                    <select className="border border-gray-200 px-4 py-3 rounded-md w-full" onChange={handleSelectChange}>
                        <option value="">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    {error && <p className="text-red-500 text-sm py-2">{error}</p>}

                </div>
                <div className="mb-4 w-[45%]">
                    <label htmlFor="bathrooms" className="block">
                        Livingrooms*
                    </label>
                    <select className="border border-gray-200 px-4 py-3 rounded-md w-full" onChange={handleSelectChangelivingRooms}>
                        <option value="">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    {error && <p className="text-red-500 text-sm py-2">{error}</p>}

                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="kitchenDescription" className="block">
                    Kitchen*
                </label>
                <textarea
                    id="kitchenDescription"
                    onChange={handleSelectChangekitchen}
                    className="border border-gray-200 px-4 py-3 rounded-md w-full"
                    required
                ></textarea>
                {error && <p className="text-red-500 text-sm py-2">{error}</p>}

            </div>
            <div className="mb-4">
                <label htmlFor="propertyLocation" className="block">
                    Location*
                </label>
                <input
                    type="text"
                    id="propertyLocation"
                    className="border border-gray-200 px-4 py-3 rounded-md w-full"
                    onChange={handleInputChangeLocation}
                    required
                />
            </div>
            {error && <p className="text-red-500 text-sm py-2">{error}</p>}

            <button disabled={disable} className='text-white w-40 bg-blue px-4 py-2 rounded-md mt-5 mb-3' onClick={save}>Save</button>

        </div>
    );
};
export default PropertyListingDetailCard