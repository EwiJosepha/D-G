"use client"

import React, { useEffect, useState } from 'react'
import { parsedId } from '@/app/utils/util';

type Prop = {
  name: string;
  type: string;
  description: string;
  price: number;
  rentOrSale: string;
  rooms: string;
  bath: string;
  livingRooms: string;
  location: string;
  kitchen: string;
  areaInKm: string;
  shortDescription: string;
  agentId: number;
}

// export interface ComponentProps {
//     saveData: (key: keyof SharedState, data: any) => void;
//     existingData: any
// }

const PropertyEdit: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [propertyInfo, setPropertyInfo] = useState<Prop>({
    name: "",
    type: "",
    description: "",
    price: 0,
    rentOrSale: "",
    rooms: "",
    bath: "",
    livingRooms: "",
    location: "",
    kitchen: "",
    areaInKm: "",
    shortDescription: "",
    agentId: parsedId
  })

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const editafields = JSON.parse(localStorage.getItem('editable') as string)
      console.log("editable", editafields);
      if (editafields) {
        setPropertyInfo(prevState => ({
          ...prevState,
          name: editafields.name || "",
        }))
        console.log(editafields.name);
        
    }
  }

  }, [])

  // const [data, setData] = useState<Prop>(existingData || propertyInfo)

  const handleInputChangee = (e: { target: { name: any, value: any } }) => {
    const { name, value } = e.target;
    setPropertyInfo({ ...propertyInfo, [name]: value })
    setError('')
  };
  const handleInputChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPropertyInfo((prevPropertyInfo) => ({
      ...prevPropertyInfo,
      price: parseFloat(value),
    }));
    // setData((prevPropertyInfo) => ({
    //     ...prevPropertyInfo,
    //     price: parseFloat(value),
    // }));

    setError('')
  };


  const handleTexarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setPropertyInfo((prevPropertyInfo) => ({
      ...prevPropertyInfo,
      description: value,
    }))
    // setData((prevPropertyInfo) => ({
    //     ...prevPropertyInfo,
    //     description: value,
    // }))
    setError('')
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setPropertyInfo((prevPropertyInfo) => ({
      ...prevPropertyInfo,
      type: value,

    }));
    // setData((prevPropertyInfo) => ({
    //     ...prevPropertyInfo,
    //     type: value,

    // }));

    setError('')
  };

  const handleSelectChangeRent = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setPropertyInfo((prevPropertyInfo) => ({
      ...prevPropertyInfo,
      rentOrSale: value,

    }));


    // setData((prevPropertyInfo) => ({
    //     ...prevPropertyInfo,
    //     rentOrSale: value,

    // }));
    setError('')
  };

  function save() {
    if (propertyInfo.description === "") {
      setError('Please fill this fields')
      return
    }

    if (propertyInfo.name === '') {
      setError('Please fill this fields')
      return
    }
    if (!propertyInfo.price) {
      setError('Please fill this fields')
      return
    }
    if (propertyInfo.rentOrSale === '') {
      setError('Please fill this fields')
      return
    }
    if (propertyInfo.areaInKm === '') {
      setError('Please fill this field')
      return
    }

    if (propertyInfo.livingRooms === '') {
      setError('Please fill this field')
      return
    }
    if (propertyInfo.location === '' && propertyInfo.location.length > 50) {
      setError('Please fill this field')
      return
    }
    if (propertyInfo.kitchen === "") {
      setError('Please fill this field')
      return
    }
    if (propertyInfo.rooms === "") {
      setError('Please fill this field')
      return
    }
    if (propertyInfo.bath === '') {
      setError('Please fill this field')
      return
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('agentData', JSON.stringify(propertyInfo));
    }

    // saveData('DbPropertyOverviewCard', data)
  }

  return (
    <>
      <div className="mt-4 p-4 shadow shadow-blue rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Overview</h3>
        <div className="mb-4">
          <label htmlFor="propertyTitle" className="block">
            Property Name*
          </label>
          <input
            type="text"
            name="name"
            value={propertyInfo.name}
            id="propertyTitle"
            className="border border-gray-200 px-4 py-3 rounded-md w-full"
            onChange={handleInputChangee}
            required
          />
          {error && <p className="p-4 shadow shadow-blue rounded-lg">{error}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="propertyDescription" className="block">
            Description*
          </label>
          <textarea
            onChange={handleInputChangee}
            id="propertyDescription"
            className="border border-gray-200 px-4 py-3 rounded-md w-full"
            name='description'
            value={propertyInfo.description}
            required
          ></textarea>
          {error && <p className="p-4 shadow shadow-blue rounded-lg">{error}</p>}

        </div>


        <div className='flex justify-between'>
          <div className="mb-4 w-[45%]">
            <label htmlFor="propertyCategory" className="block">
              Property Type*
            </label>
            <select className="border border-gray-200 px-4 py-3 rounded-md w-full"
              name='type'
              value={propertyInfo.type}
              onChange={handleInputChangee}>
              <option value='apartment'>Apartment</option>
              <option value='studios'>Studios</option>
              <option value='house'>House</option>
              <option value='villas'>Villas</option>
              <option value='self-contain'>Self Contain</option>
            </select>
            {error && <p className="p-4 shadow shadow-blue rounded-lg">{error}</p>}

          </div>
          <div className="mb-4 w-[45%]">
            <label htmlFor="listedIn" className="block">
              Listed in*
            </label>
            <select className="border border-gray-200 px-4 py-3 rounded-md w-full"
              name='rentOrSale'
              value={propertyInfo.rentOrSale}
              onChange={handleInputChangee}>
              <option value="">All Listings</option>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
              <option value="rent">Rent</option>
            </select>
            {error && <p className="p-4 shadow shadow-blue rounded-lg">{error}</p>}

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
            name='price'
            value={propertyInfo.price}
            onChange={handleInputChangee}
            required
          />
        </div>
        {error && <p className="p-4 shadow shadow-blue rounded-lg">{error}</p>}
      </div>
      <div className="p-4 shadow shadow-blue rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Listing Details</h3>

        <div className='flex justify-between items-center'>
          <div className="my-4 w-[45%]">
            <label htmlFor="propertySize" className="block">
              Surface Area in ft*
            </label>
            <input
              type="text"
              name="name"
              value={propertyInfo.areaInKm}
              id="propertySize"
              className="border border-gray-200 px-4 py-3 rounded-md w-full"
              onChange={handleInputChangee}
              required
            />
            {error && <p className="p-4 shadow shadow-blue rounded-lg">{error}</p>}
          </div>

          <div className="mb-4 w-[45%]">
            <label htmlFor="bedrooms" className="block">
              Bedrooms*
            </label>
            <select className="border border-gray-200 px-4 py-3 rounded-md w-full" onChange={handleInputChangee}>
              <option value="">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {error && <p className="p-4 shadow shadow-blue rounded-lg">{error}</p>}

          </div>
        </div>
        <div className='flex justify-between'>
          <div className="mb-4 w-[45%]">
            <label htmlFor="bathrooms" className="block">
              Bathrooms*
            </label>
            <select className="border border-gray-200 px-4 py-3 rounded-md w-full" onChange={handleInputChangee}>
              <option value="">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {error && <p className="p-4 shadow shadow-blue rounded-lg">{error}</p>}

          </div>
          <div className="mb-4 w-[45%]">
            <label htmlFor="bathrooms" className="block">
              Livingrooms*
            </label>
            <select className="border border-gray-200 px-4 py-3 rounded-md w-full" onChange={handleInputChangee}>
              <option value="">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {error && <p className="p-4 shadow shadow-blue rounded-lg">{error}</p>}

          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="kitchenDescription" className="block">
            Kitchen*
          </label>
          <textarea
            id="kitchenDescription"
            onChange={handleInputChangee}
            className="border border-gray-200 px-4 py-3 rounded-md w-full"
            required
          ></textarea>
          {error && <p className="p-4 shadow shadow-blue rounded-lg">{error}</p>}

        </div>
        <div className="mb-4">
          <label htmlFor="propertyLocation" className="block">
            Location*
          </label>
          <input
            type="text"
            id="propertyLocation"
            className="border border-gray-200 px-4 py-3 rounded-md w-full"
            onChange={handleInputChangee}
            required
          />
        </div>
        {error && <p className="p-4 shadow shadow-blue rounded-lg">{error}</p>}

        <button onClick={save}>Save</button>

      </div>
    </>);
};

export default PropertyEdit
