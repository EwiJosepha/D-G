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
    areaInKm: number;
    shortDescription: string;
    agentId: number;
}

const PropertyListingDetailCard: React.FC<ComponentProps> = ({ saveData, existingData }) => {
    const [error, setError] = useState<string>('');
    const [errorrooms, setErrorrooms] = useState<string>('');
    const [errorbath, setErrorbath] = useState<string>('');
    const [errorlivingrooms, setErrorlivingrooms] = useState<string>('');
    const [errorlocation, setErrorlocation] = useState<string>('');
    const [errorkitchen, setErrorkitchen] = useState<string>('');
    const [errorarea, setErrorarea] = useState<string>('');
    const [disable, setDisable] = useState(false)
    const notify = () => toast.success("Save Property successfully")


    const [propertyInfo, setPropertyInfo] = useState<Prop>({
        rooms: "",
        bath: "",
        livingRooms: "",
        location: "",
        kitchen: "",
        areaInKm: 0,
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
        setErrorbath('')
    };

    const handleSelectChangelivingRooms = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setPropertyInfo((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            livingRooms: value,
        }));


        setData((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            livingRooms: value,
        }));

        setErrorlivingrooms('')
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
        setErrorkitchen('')
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
        setErrorrooms('')
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPropertyInfo((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            areaInKm: parseFloat(value),
        }));

        setData((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            areaInKm: parseFloat(value),
        }));
        setErrorarea('')
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

        setErrorlocation('')
    }

    function save() {
        if (propertyInfo.areaInKm === 0) {
            setErrorarea('Area is required*')
            return
        }

        if (propertyInfo.livingRooms === '') {
            setErrorlivingrooms('Living room is requied*')
            return
        }
        if (propertyInfo.location === '' && propertyInfo.location.length > 50) {
            setErrorlocation('location is required*')
            return
        }
        if (propertyInfo.kitchen === "") {
            setErrorkitchen('kitchen is required*')
            return
        }
        if (propertyInfo.rooms === "") {
            setErrorrooms('Room is required*')
            return
        }
        if (propertyInfo.bath === '') {
            setErrorbath('bath is required*')
            return
        }

        saveData('PropertyListingDetailCard', {
            ...data,
            agentId: propertyInfo.agentId,
        });

        notify()
        setDisable(true)

    }

    return (
        <div className="p-4 shadow shadow-blue rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Listing Details</h3>

            <div className='flex justify-between items-center'>
                <div className="my-4 w-[45%]">
                    <label htmlFor="propertySize" className="block">
                        Surface Area in m2
                    </label>
                    <input
                        type="text"
                        id="propertySize"
                        className="border border-gray-200 px-4 py-3 rounded-md w-full"
                        onChange={handleInputChange}
                        required
                    />
                    {errorarea && <p className="text-red-500 text-sm py-2">{errorarea}</p>}
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
                    {errorrooms && <p className="text-red-500 text-sm py-2">{errorrooms}</p>}

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
                    {errorbath && <p className="text-red-500 text-sm py-2">{errorbath}</p>}

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
                    {errorlivingrooms && <p className="text-red-500 text-sm py-2">{errorlivingrooms}</p>}

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
                {errorkitchen && <p className="text-red-500 text-sm py-2">{errorkitchen}</p>}

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
            {errorlocation && <p className="text-red-500 text-sm py-2">{errorlocation}</p>}

            <button disabled={disable} className='text-white w-40 bg-blue px-4 py-2 rounded-md mt-5 mb-3' onClick={save}>Save</button>

        </div>
    );
};
export default PropertyListingDetailCard