"use client"
import React, { useEffect, useState } from 'react'
import { parsedId } from '@/app/utils/util';
import { updateproperties } from '@/app/utils/util';
import { getsingleDashboardProp } from '@/app/utils/util';
import { useRouter } from 'next/navigation';
import DdHeaderProvider from '@/components/db-header-provider';
import Spinner from '@/components/molecules/loaders/Spinner';


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

const PropertyEdit: React.FC = () => {
  const router = useRouter()
  const [error, setError] = useState<string>('');
  const [loading, setLoading]= useState(false)

  const { data } = getsingleDashboardProp()
  console.log("editd", data);

  const [propertyInfo2, setPropertyInfo2] = useState<Prop>({

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
    if (data) {
      setPropertyInfo2({
        ...propertyInfo2,
        name: data.name || "",
        description: data.description || "",
        price: data.price || 0,
        livingRooms: data.livingRooms || "",
        rentOrSale: data.rentOrSale || "",
        rooms: data.rooms || "",
        bath: data.bath || "",
        location: data.location || "",
        kitchen: data.kitchen || "",
        areaInKm: data.areaInKm || "",
        agentId: data.agentId || "",
      })
    }

  }, [data])

  const handleInputChangee = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPropertyInfo2({ ...propertyInfo2, [name]: value });
    setError('');
  };

  function save1() {
    if (propertyInfo2.description === "") {
      setError('Please fill this fields')
      return
    }

    if (propertyInfo2.name === '') {
      setError('Please fill this fields')
      return
    }
    if (!propertyInfo2.price) {
      setError('Please fill this fields')
      return
    }
    if (propertyInfo2.rentOrSale === '') {
      setError('Please fill this fields')
      return
    }
    if (propertyInfo2.areaInKm === '') {
      setError('Please fill this field')
      return
    }

    if (propertyInfo2.livingRooms === '') {
      setError('Please fill this field')
      return
    }
    if (propertyInfo2.location === '' && propertyInfo2.location.length > 50) {
      setError('Please fill this field')
      return
    }
    if (propertyInfo2.kitchen === "") {
      setError('Please fill this field')
      return
    }
    if (propertyInfo2.rooms === "") {
      setError('Please fill this field')
      return
    }
    if (propertyInfo2.bath === '') {
      setError('Please fill this field')
      return
    }

    const updatedValues = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(propertyInfo2)
    };

    fetch(updateproperties, updatedValues)

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

  }


  return (
    <>
      <DdHeaderProvider header='Edit Property' >
        <form onSubmit={(e) => { e.preventDefault(); save1(); }} className='p-6 mx-auto container py-10 px-20 mb-0'>

          <div className="mt-4 p-4 shadow shadow-blue rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Overview </h3>
          <div className="mb-4">
            <label htmlFor="propertyTitle" className="block">
              Property Name*
            </label>
            <input
              type="text"
              name="name"
              value={propertyInfo2.name}
              id="propertyTitle"
              className="border border-gray-200 px-4 py-3 rounded-md w-full"
              onChange={handleInputChangee}
              required
            />
            {error && <p className="text-red-600 font-serif text-base">{error}</p>}
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
              value={propertyInfo2.description}
              required
            ></textarea>
            {error && <p className="text-red-600 font-serif text-base">{error}</p>}

          </div>


          <div className='flex justify-between'>
            <div className="mb-4 w-[45%]">
              <label htmlFor="propertyCategory" className="block">
                Property Type*
              </label>
              <select className="border border-gray-200 px-4 py-3 rounded-md w-full"
                name='type'
                value={propertyInfo2.type}
                onChange={handleInputChangee}>
                <option value='apartment'>Apartment</option>
                <option value='studios'>Studios</option>
                <option value='house'>House</option>
                <option value='villas'>Villas</option>
                <option value='self-contain'>Self Contain</option>
              </select>
              {error && <p className="text-red-600 font-serif text-base">{error}</p>}

            </div>
            <div className="mb-4 w-[45%]">
              <label htmlFor="listedIn" className="block">
                Listed in*
              </label>
              <select className="border border-gray-200 px-4 py-3 rounded-md w-full"
                name='rentOrSale'
                value={propertyInfo2.rentOrSale}
                onChange={handleInputChangee}>
                <option value="">All Listings</option>
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
                <option value="rent">Rent</option>
              </select>
              {error && <p className="text-red-600 font-serif text-base">{error}</p>}

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
              value={propertyInfo2.price}
              onChange={handleInputChangee}
              required
            />
          </div>
          {error && <p className="p-4 shadow shadow-blue rounded-lg">{error}</p>}
        </div>
        <div className="mt-4 p-4 shadow shadow-blue rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Listing Details</h3>

          <div className='flex justify-between items-center'>
            <div className="my-4 w-[45%]">
              <label htmlFor="propertySize" className="block">
                Surface Area in ft*
              </label>
              <input
                type="text"
                name="name"
                value={propertyInfo2.areaInKm}
                id="propertySize"
                className="border border-gray-200 px-4 py-3 rounded-md w-full"
                onChange={handleInputChangee}
                required
              />
              {error && <p className="text-red-600 font-serif text-base">{error}</p>}
            </div>

            <div className="mb-4 w-[45%]">
              <label htmlFor="bedrooms" className="block">
                Bedrooms*
              </label>
              <select className="border border-gray-200 px-4 py-3 rounded-md w-full"
                name="rooms"
                value={propertyInfo2.rooms} onChange={handleInputChangee}>
                <option value="">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              {error && <p className="text-red-600 font-serif text-base">{error}</p>}

            </div>
          </div>
          <div className='flex justify-between'>
            <div className="mb-4 w-[45%]">
              <label htmlFor="bathrooms" className="block">
                Bathrooms*
              </label>
              <select className="border border-gray-200 px-4 py-3 rounded-md w-full"
                name="bath"
                value={propertyInfo2.bath} onChange={handleInputChangee}>
                <option value="">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              {error && <p className="text-red-600 font-serif text-base">{error}</p>}

            </div>
            <div className="mb-4 w-[45%]">
              <label htmlFor="bathrooms" className="block">
                Livingrooms*
              </label>
              <select className="border border-gray-200 px-4 py-3 rounded-md w-full"
                name="livingRooms"
                value={propertyInfo2.livingRooms} onChange={handleInputChangee}>
                <option value="">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              {error && <p className="text-red-600 font-serif text-base">{error}</p>}

            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="kitchenDescription" className="block">
              Kitchen*
            </label>
            <textarea
              id="kitchenDescription"
              name="kitchen"
              value={propertyInfo2.kitchen}
              onChange={handleInputChangee}
              className="border border-gray-200 px-4 py-3 rounded-md w-full"
              required
            ></textarea>
            {error && <p className="text-red-600 font-serif text-base">{error}</p>}

          </div>
          <div className="mb-4">
            <label htmlFor="propertyLocation" className="block">
              Location*
            </label>
            <input
              type="text"
              id="propertyLocation"
              className="border border-gray-200 px-4 py-3 rounded-md w-full"
              name="location"
              value={propertyInfo2.location}
              onChange={handleInputChangee}
              required
            />
          </div>
          

          </div>

          {error && <p className="p-4 shadow shadow-blue rounded-lg">{error}</p>}<br/>

          <button
            disabled={loading} className=' disabled:bg-slate-400 disabled:hover:cursor-wait w-full flex items-center justify-center bg-blue text-white py-2 px-4 rounded hover:bg-blue transition-all duration-300' type='submit'
          >{loading? <Spinner/>: "save"}</button>
        </form>
      </DdHeaderProvider>
      
    </>);
};

export default PropertyEdit
