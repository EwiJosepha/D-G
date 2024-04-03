import React, { useState } from "react";
import { SharedState } from "@/app/(dashboard-details-page)/dashboard/addNewProperties/page";
import { ComponentProps } from "./propertyOverviewCard";
import { parsedId } from "@/app/utils/util";

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
    }

    function save() {
        saveData('PropertyListingDetailCard', {
            ...data,
            agentId: propertyInfo.agentId,
        });
    }
    console.log("com", propertyInfo);


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
                    />
                </div>
                <div className="mb-4 w-[45%]">
                    <label htmlFor="bedrooms" className="block">
                        Bedrooms*
                    </label>
                    <select className="border border-gray-200 px-4 py-3 rounded-md w-full" onChange={handleSelectChangeRooms}>
                        <option value="">0</option>
                        <option value="number">1</option>
                        <option value="number">2</option>
                        <option value="number">3</option>
                        <option value="number">4</option>
                        <option value="number">5</option>
                    </select>
                </div>
            </div>
            <div className='flex justify-between'>
                <div className="mb-4 w-[45%]">
                    <label htmlFor="bathrooms" className="block">
                        Bathrooms*
                    </label>
                    <select className="border border-gray-200 px-4 py-3 rounded-md w-full" onChange={handleSelectChange}>
                        <option value="">0</option>
                        <option value="number">1</option>
                        <option value="number">2</option>
                        <option value="number">3</option>
                        <option value="number">4</option>
                        <option value="number">5</option>
                    </select>
                </div>
                <div className="mb-4 w-[45%]">
                    <label htmlFor="bathrooms" className="block">
                        Livingrooms*
                    </label>
                    <select className="border border-gray-200 px-4 py-3 rounded-md w-full" onChange={handleSelectChangelivingRooms}>
                        <option value="">0</option>
                        <option value="number">1</option>
                        <option value="number">2</option>
                        <option value="number">3</option>
                        <option value="number">4</option>
                        <option value="number">5</option>
                    </select>
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
                ></textarea>
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
                />
            </div>
            <button onClick={save}>Save</button>

        </div>
    );
};
export default PropertyListingDetailCard