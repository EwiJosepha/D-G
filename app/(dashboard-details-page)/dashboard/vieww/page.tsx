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
    <>
      <DdHeaderProvider header="View Profile">
        <div className="mx-auto py-10 px-20 items-center justify-center flex flex-col">
          <div className="flex justify-center mb-6 w-52 h-52">
            <Image alt='DP' src='/av5.jpg' layout='responsive' height={200} width={200} className='rounded-full object-cover' />
            {/* <Image
              src={formData?.profilePicture || '/default-profile-picture.jpg'}
              alt="Profile Picture"
              layout='responsive' height={200} width={200} 
              className="rounded-full object-cover"
            /> */}
          </div>

          <p className="font-bold text-3xl font-serif capitalize">{formData?.username}</p>

          <p className="text-base">{formData?.email}</p>

          <p className="text-lg mb-4">{formData?.phoneNumber}</p>

          <p className="text-lg"> {formData?.bio}</p>

          <Link href="/dashboard/edit">
            <button className="text-red-400 w-40 font-extrabold rounded-md mt-20 flex items-center">
              <FaPencil className="mr-4" /> Edit Profile
            </button>
          </Link>
        </div>
      </DdHeaderProvider>
    </>
  );
};

export default ViewProfile;