'use client'

import DdHeaderProvider from '@/app/_components/db-header-provider';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppContext } from '@/app/_core/store/app-context';
import { FaPencil } from 'react-icons/fa6';
import Image from 'next/image';

const ViewProfile: React.FC<{}> = (): JSX.Element | null => {
  const [formData, setFormData] = useState<any | null>(null);
  // const { profileInfo, setProfileInfo } = useAppContext()

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const storedData = localStorage.getItem('agentData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setFormData(parsedData);
        console.log('parsed data', parsedData);
      }
    }
  }, []);

  return (
    <div>
      <DdHeaderProvider header="View Profile">
        <div className="mx-auto container py-10 px-20 mb-16">
          <div className="flex justify-center mb-10">
            <Image alt='DP' src='./public/av5.jpg'></Image>
            {/* <img
              src={formData?.profilePicture || '/default-profile-picture.jpg'}
              alt="Profile Picture"
              className="w-40 h-40 rounded-full object-cover"
            /> */}
          </div>

          <div className="flex justify-center mb-4">
            <h2 className="text-2xl font-medium">{formData?.firstName} {formData?.lastName}</h2>
          </div>

          <div className="flex justify-center mb-4">
            <p className="text-lg">{formData?.bio}</p>
          </div>

          <div className="flex justify-center mb-4">
            <p className="text-lg">Username: {formData?.username}</p>
          </div>

          <div className="flex justify-center mb-4">
            <p className="text-lg">Email: {formData?.email}</p>
          </div>

          <div className="flex justify-center mb-4">
            <p className="text-lg">Phone Number: {formData?.phoneNumber}</p>
          </div>

          <Link href="/dashboard/edit">
            <button className="text-white w-40 bg-blue px-4 py-2 rounded-md mr-16 mt-10 flex items-center">
              <FaPencil className="mr-4" /> Edit Profile
            </button>
          </Link>
        </div>
      </DdHeaderProvider>
    </div>
  );
};

export default ViewProfile;