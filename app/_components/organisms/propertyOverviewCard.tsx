"use-client"
import React, { useState } from 'react'
import { SharedState } from '@/app/(dashboard-details-page)/dashboard/addNewProperties/page';
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
    const [propertyInfo, setPropertyInfo] = useState<Prop>({
        name: "",
        type: "",
        description: "",
        price: 0,
        rentOrSale: "",
    })

    const [data, setData] = useState<Prop>(existingData || propertyInfo)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPropertyInfo((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            name: value,
        }));

        setData((prevPropertyInfo) => ({
            ...prevPropertyInfo,
            name: value,
        }));

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
    };

    function save() {
        saveData('DbPropertyOverviewCard', data)
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
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="propertyDescription" className="block">
                    Description*
                </label>
                <textarea
                    onChange={handleTexarea}
                    id="propertyDescription"
                    className="border border-gray-200 px-4 py-3 rounded-md w-full"
                ></textarea>
            </div>


            <div className='flex justify-between'>
                <div className="mb-4 w-[45%]">
                    <label htmlFor="propertyCategory" className="block">
                        Property Type*
                    </label>
                    <select className="border border-gray-200 px-4 py-3 rounded-md w-full"
                        onChange={handleSelectChange}>
                        <option value='apartment'>Apartment</option>
                        <option value='studios'>Studios</option>
                        <option value='house'>House</option>
                        <option value='villas'>Villas</option>
                        <option value='self-contain'>Self Contain</option>
                    </select>
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
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="propertyPrice" className="block">
                    Price*
                </label>
                <input
                    type="text"
                    id="propertyPrice"
                    className="border border-gray-200 px-4 py-3 rounded-md w-full"
                    onChange={handleInputChangePrice}
                />
            </div>
            <button onClick={save}>save</button>
        </div>
    );
};
export default DbPropertyOverviewCard

// import React, { useState, useEffect } from 'react';

// // Define a shared state object to hold combined data
// const sharedStateDefault = {
//   component1Data: {},
//   component2Data: {},
//   component3Data: {}
// };

// const CombinedComponent = () => {
//   const [sharedState, setSharedState] = useState(sharedStateDefault);

//   // Function to save data to localStorage and update sharedState
//   const saveData = (key, data) => {
//     localStorage.setItem(key, JSON.stringify(data));
//     setSharedState(prevState => ({
//       ...prevState,
//       [key]: data
//     }));
//   };

//   // Function to load data from localStorage and update sharedState
//   const loadData = (key) => {
//     const data = JSON.parse(localStorage.getItem(key));
//     if (data) {
//       setSharedState(prevState => ({
//         ...prevState,
//         [key]: data
//       }));
//     }
//   };

//   // Load data from localStorage on component mount
//   useEffect(() => {
//     loadData('component1Data');
//     loadData('component2Data');
//     loadData('component3Data');
//   }, []);

//   // Submit function to send combined data to server
//   const handleSubmit = () => {
//     // Implement your fetch logic here to send sharedState to server
//     console.log('Submitting combined data:', sharedState);
//   };

//   return (
//     <div>
//       {/* Render your components and pass saveData function as prop */}
//       <Component1 saveData={saveData} existingData={sharedState.component1Data} />
//       <Component2 saveData={saveData} existingData={sharedState.component2Data} />
//       <Component3 saveData={saveData} existingData={sharedState.component3Data} />

//       {/* Submit button */}
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

// // Component1 example
// const Component1 = ({ saveData, existingData }) => {
//   const [data, setData] = useState(existingData);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSave = () => {
//     saveData('component1Data', data);
//   };

//   return (
//     <div>
//       <h2>Component 1</h2>
//       <input type="text" name="field1" value={data.field1 || ''} onChange={handleChange} />
//       <input type="text" name="field2" value={data.field2 || ''} onChange={handleChange} />
//       <button onClick={handleSave}>Save</button>
//     </div>
//   );
// };

// // Component2 and Component3 follow similar structure

// export default CombinedComponent;