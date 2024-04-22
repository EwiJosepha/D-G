'use client'
import { useRouter } from "next/router";

import { useAppContext } from "@/store/app-context";

interface DescriptionPageProps {
  //
}

const DescriptionPage: React.FC<DescriptionPageProps> = ({ }: DescriptionPageProps) => {

  const { propertyInfo } = useAppContext();


  return (
    <div className="container mx-auto font-serif py-20">
      {propertyInfo.map((property) => (<div key={property.id} className="items-center justify-center flex flex-col">
        <h1 className="text-4xl my-4 ">{property.name}</h1>
        <p className="text-3xl font-thin">Location </p>
      </div>))}

      <div className="md:flex mt-16">
        <div className="w-full md:flex justify-between items-center md:w-1/3 p-4 mr-10">
          <div className="bg-black text-white rounded shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4 font-mono"> Details</h2>
            <div className="flex flex-wrap">
              <div className="w-full border-t border-gray-600 flex items-center sm:w-1/2 p-4">
                <p className="mr-4">Number of Rooms:</p>
                <p className="text-lg font-semibold"></p>
              </div>
              <div className="w-full border-t border-gray-600 flex items-center sm:w-1/2 p-4">
                <p className="mr-4">Number of Baths:</p>
                <p className="text-lg font-semibold"></p>
              </div>
              <div className="w-full border-t border-gray-600 flex items-center sm:w-1/2 p-4">
                <p className="mr-4">Living Room:</p>
                <p className="text-lg font-semibold"></p>
              </div>
              <div className="w-full border-t border-gray-600 flex items-center sm:w-1/2 p-4">
                <p className="mr-4">Status:</p>
                <p className="text-lg font-semibold"></p>
              </div>
              <div className="w-full border-t border-gray-600 flex items-center sm:w-1/2 p-4">
                <p className="mr-4">Area:</p>
                <p className="text-lg font-semibold"></p>
              </div>
              <div className="w-full border-t border-gray-600 flex items-center sm:w-1/2 p-4">
                <p className="mr-4">Price:</p>
                <p className="text-lg font-semibold">$ </p>
              </div>
            </div>
            <div className="mt-4 w-full flex justify-between items-center border-t border-gray-700 py-4">
              <p className=" mr-4">Description:</p>
              <p></p>
            </div>
          </div>
        </div>

        <div className="w-full items-center md:w-3/5 p-4 text-gray-700 text-base">
          <p className="mb-20">Congratulations! You've found a beautiful property with great features. This property offers a healthy and comfortable living environment. Here are some key highlights:  Spacious rooms with plenty of natural light Modern and well-equipped kitchen Beautifully landscaped garden State-of-the-art fitness center Serene and peaceful neighborhood Proximity to parks and green spaces Easy access to hiking and biking trails Healthy and sustainable building materials Energy-efficient appliances Water-saving fixtures Don't miss the opportunity to make this property your own and enjoy a healthy lifestyle!</p>
          <p className="mb-6">Contact Josepha and Daisy for more information and/or to schedule a showing of the property you interested in 🥰</p>
          <button className="border-2 border-yellow-600 text-yellow-800 py-3 hover:bg-yellow-600 hover:text-white cursor-pointer px-8"> Share Property </button>
        </div>
      </div>
    </div>
  );
};

export default DescriptionPage;