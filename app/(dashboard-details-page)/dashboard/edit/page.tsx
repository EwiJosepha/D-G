'use client'
import DdHeaderProvider from '@/app/_components/db-header-provider'
import React, { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'

interface FormData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  bio: string;
}
const EditProfile: React.FC<{}> = (): JSX.Element | null => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    bio: ''
  });

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const storedFormData = localStorage.getItem('agentData');
      if (storedFormData) {
        setFormData(JSON.parse(storedFormData));
      }
    }
  }, []);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('agentData', JSON.stringify(formData));
    }
  };

  return (
    <div>
      <DdHeaderProvider header="Edit Page" submit=''>
        <div className="mx-auto container py-10 px-20 mb-16">
          < div className="mb-4">
            <label htmlFor="username" className="block font-medium">
              Username*
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username || ''}
              onChange={handleInputChange}
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
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                required />
            </div>

            <div className="mb-4 w-[45%]">
              <label htmlFor="lastName" className="block font-medium">
                Last Name*
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}

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
                name="email"
                value={formData.email}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4 w-[45%]">
              <label htmlFor="phoneNumber" className="block font-medium">
                Phone Number*
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                onChange={handleInputChange}
                required />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="bio" className="block font-medium">
              Bio*
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              required></textarea>
          </div>
          <Link href={"./vieww"}>
            <button className=' bg-slate-950 text-red-500' type="submit" onClick={handleSubmit}>Save</button>
          </Link>
        </div>
      </DdHeaderProvider>
    </div>
  )
}

export default EditProfile