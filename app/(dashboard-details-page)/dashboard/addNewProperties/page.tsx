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

        
    const spreadCom : {name: string,description: string,type:string,rentOrSale:string, price: string } =shareState.DbPropertyOverviewCard

    const spreadtwo: {areaKm: string, bath:number,  livingRooms:number,rooms:number,location: string}= shareState.PropertyListingDetailCard

    console.log("spread", spreadCom);
    console.log("spread2", spreadtwo)

   
    const combinedObject: DbPropertyOverviewCard & PropertyListingDetailCard = {
        ...spreadCom,
        ...spreadtwo
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
        <DdHeaderProvider header="New Properties" submit="">
            <div className="mx-auto container py-6 px-4 md:px-20">

                <div className="space-y-16">
                    {/* Overview Card */}
                    <DbPropertyOverviewCard saveData={saveData} existingData={shareState.DbPropertyOverviewCard} />

                    {/* Listing Details Card */}
                    <PropertyListingDetailCard saveData={saveData} existingData={shareState.PropertyListingDetailCard} />

                    {/* Photo and Video Upload Card */}
                    <PropertyImageCard />



                </div>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        </DdHeaderProvider>
    );
};

export default AddNewProperty;


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