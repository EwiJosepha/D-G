'use client'

import DdHeaderProvider from '@/app/_components/db-header-provider';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { agentdata } from '@/app/utils/util';
import { useAppContext } from '@/app/_core/store/app-context';
import Link from 'next/link';


const Profile: React.FC = () => {
    // const { profileInfo, setProfileInfo } = useAppContext()
    const [imageUrl, setImageUrl] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('');
    // const [showProfile, setShowProfile] = useState(Boolean)
    // const [createProfile, setCreatProfile] = useState(Boolean)
    // const [agentEmaill, setAgentEmaill] = useState<string | undefined>()
    // const [agentId, setAgentId] = useState<number | undefined>()
    // const [datafromLocalStorage, setDatafromLocalStorage] = useState<string | any>()

    const { data } = agentdata()
    const agentIdd = data?.id
    const agents_email = data?.email




    //    targeting currentUser data from Ls

    // if (typeof localStorage !== "undefined") {
    //     const email_Id: { id?: number, email?: string } = JSON.parse(localStorage.getItem('decoded') as string)
    //     setAgentEmaill(email)
    //     setAgentId(agentId)
    // }

    //handling form data
    function submitData() {
        const formData = {
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            bio: bio
        }
        localStorage.setItem("agentData", JSON.stringify(formData))
        console.log(formData);
    }

    
    const handleUsername = (e: any) => {
        e.preventDefault
        const name = e.target.value
        setUsername(name)
    }

    const handleFirstName = (e: any) => {
        e.preventDefault
        const firstname = e.target.value
        setFirstName(firstname)
    }
    const handleLastName = (e: any) => {
        e.preventDefault
        const lastname = e.target.value
        setLastName(lastname)
    }
    const handleEmail = (e: any) => {
        e.preventDefault
        const email = e.target.value
        setEmail(email)
    }
    const handlePhoneNumber = (e: any) => {
        e.preventDefault
        const phoneNumber = e.target.value
        setPhoneNumber(phoneNumber)
    }
    const handleBio = (e: any) => {
        e.preventDefault
        const bio = e.target.value
        setBio(bio)
    }

    const handleImageDelete = () => {
        setImageUrl('');
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImageUrl(reader.result as string);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <DdHeaderProvider header="Profile" submit=''>
            <>
                <div className="mx-auto container py-10 px-20 mb-16">
                    {/* Profile Image */}
                    {imageUrl && (
                        <div className="mb-4 flex items-center">
                            <img src={imageUrl} alt="Profile" className=" h-16 w-16 rounded-full" />

                            <button className="text-red-500 ml-2" onClick={handleImageDelete}>
                                Delete
                            </button>
                        </div>
                    )}

                    <div className="mb-4">
                        <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
                    </div>



                    {/* Username */}
                    < div className="mb-4">
                        <label htmlFor="username" className="block font-medium">
                            Username*
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => handleUsername(e)}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            required />
                    </div>

                    <div className='flex justify-between'>
                        {/* First Name */}
                        <div className="mb-4 w-[45%]">
                            <label htmlFor="firstName" className="block font-medium">
                                First Name*
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => handleFirstName(e)}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                required />
                        </div>

                        {/* Last Name */}
                        <div className="mb-4 w-[45%]">
                            <label htmlFor="lastName" className="block font-medium">
                                Last Name*
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => handleLastName(e)}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            />
                        </div>
                    </div>

                    <div className='flex justify-between'>
                        {/* Email */}
                        <div className="mb-4 w-[45%]">
                            <label htmlFor="email" className="block font-medium">
                                Email*
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => handleEmail(e)}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="mb-4 w-[45%]">
                            <label htmlFor="phoneNumber" className="block font-medium">
                                Phone Number*
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => handlePhoneNumber(e)}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                required />
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="mb-4">
                        <label htmlFor="bio" className="block font-medium">
                            Bio*
                        </label>
                        <textarea
                            id="bio"
                            value={bio}
                            onChange={(e) => handleBio(e)}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            required></textarea>
                    </div>
                    <Link href={"/dashboard"}>
                        <button className=' bg-slate-950 text-red-500' onClick={submitData}>submit</button>
                    </Link>

                    {/* Submit Button */}
                    {/* have use props to pass the data between components  */}
                </div>


            </>
        </DdHeaderProvider >
    );
};

export default Profile;