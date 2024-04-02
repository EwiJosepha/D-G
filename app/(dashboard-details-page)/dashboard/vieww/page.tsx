'use client'
import DdHeaderProvider from '@/app/_components/db-header-provider'
import React, { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import { useAppContext } from '@/app/_core/store/app-context'
import { FaEdit, FaRegEdit } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'

const ViewProfile: React.FC<{}> = (): JSX.Element | null => {
  const [formData, setFormData] = useState<any | null>(null);
  // const { profileInfo, setProfileInfo } = useAppContext()
  // const [localVal, setLocalVal] = useState<{
  //   username: string;
  //   firstName: string;
  //   lastName: string;
  //   email: string;
  //   phoneNumber: string;
  //   bio: string;
  // } | undefined>(undefined);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const storedData = localStorage.getItem('agentData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setFormData(parsedData);
        console.log("parsed data", parsedData);
      }
    }
  }, []);

  return (
    <div>
      <DdHeaderProvider header="View Page" submit=''>
        <div className="mx-auto container py-10 px-20 mb-16">

          < div className="mb-4 mt-8">
            <label htmlFor="username" className="block font-medium">
              Username*
            </label>
            <input
              type="text"
              id="username"
              value={formData?.username || ''}
              readOnly

              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              required />
          </div>

          <div className='flex justify-between'>

            <div className="mb-4 w-[45%]">
              <label htmlFor="firstName" className="block font-medium">
                First Name*
              </label>
              <input
                type="text"
                id="firstName"
                value={formData?.firstName || ''}
                readOnly

                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                required />
            </div>


            <div className="mb-4 w-[45%]">
              <label htmlFor="lastName" className="block font-medium">
                Last Name*
              </label>
              <input
                type="text"
                id="lastName"
                value={formData?.lastName || ''}
                readOnly
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
              />
            </div>
          </div>

          <div className='flex justify-between'>

            <div className="mb-4 w-[45%]">
              <label htmlFor="email" className="block font-medium">
                Email*
              </label>
              <input
                type="email"
                id="email"
                value={formData?.email || ''}
                readOnly
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
              />
            </div>


            <div className="mb-4 w-[45%]">
              <label htmlFor="phoneNumber" className="block font-medium">
                Phone Number*
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={formData?.phoneNumber || ''}
                readOnly
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                required />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="bio" className="block font-medium">
              Bio*
            </label>
            <textarea
              id="bio"
              value={formData?.bio || ""}
              readOnly
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              required></textarea>
          </div>
          <Link href={"/dashboard/edit"}>
            <button className='text-white w-40 bg-blue px-4 py-2 rounded-md mr-16 mt-10 flex items-center'> <FaPencil className='mr-4' /> Edit Profile</button>
          </Link>
        </div>
      </DdHeaderProvider>
    </div>
  )
}

export default ViewProfile