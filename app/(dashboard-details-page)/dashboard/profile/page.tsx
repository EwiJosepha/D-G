'use client'

import DdHeaderProvider from '@/app/_components/db-header-provider';
import { useEffect, useState } from 'react';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { agentdata } from '@/app/utils/util';
import Image from 'next/image';


const Profile: React.FC = () => {
    const router = useRouter()
    const [isProfileCreated, setIsProfileCreated] = useState(false)
    const [imageUrl, setImageUrl] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState<string>('');
    const [errorf, setErrorf] = useState<string>('');
    const [errorl, setErrorl] = useState<string>('');
    const [errorn, setErrorn] = useState<string>('');
    const [errorb, setErrorb] = useState<string>('');
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [wrongEmail, setWrongEmail] = useState(false);
    const { data } = agentdata()
    const emailAgent = data?.email

    useEffect(() => {
        const islocalstorageEmpty = localStorage.getItem("agentData")
        setIsProfileCreated(!!islocalstorageEmpty)

        if (isProfileCreated) {
            router.push("/dashboard/vieww")
        }

    }, [])

    //handling form data

    function submitData() {
        const formData = {
            imageUrl: imageUrl,
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            bio: bio
        }
        localStorage.setItem("agentData", JSON.stringify(formData))
        console.log(formData);
        setIsLoading(true)
    }

    const handleUsername = (e: any) => {
        e.preventDefault
        const name = e.target.value
        setUsername(name)
        // if (name === "") {
        //     setError('Field is required*')
        // }
    }

    const handleFirstName = (e: any) => {
        e.preventDefault
        const firstname = e.target.value
        setFirstName(firstname)
        if (firstName === "") {
            setError('Field is required*')
        }
    }

    const handleLastName = (e: any) => {
        e.preventDefault
        const lastname = e.target.value
        setLastName(lastname)
        if (lastName === "") {
            setError('Field is required*')
        }
    }

    const handleEmail = (e: any) => {
        e.preventDefault
        const email = e.target.value
        setEmail(email)
    }

    const handlePhoneNumber = (value: any) => {
        setPhoneNumber(value)
        if (phoneNumber === "" && phoneNumber.length > 10) {
            setErrorn('Incorrect Number')
        } else {
            setErrorn("")
        }

    }

    const handleBio = (e: any) => {
        e.preventDefault
        setBio(e.target.value)
        if (bio === "" && bio.length > 300) {
            setErrorb('too long')
        } else {
            setErrorb("")
        }
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
        <DdHeaderProvider header="Profile">
            <>
                {!isProfileCreated && (
                    <div className="mx-auto container py-10 px-20 mb-10">
                        {imageUrl && (
                            <div className="mb-4 mt-4 flex items-center">
                                <label htmlFor="profilepicture" className="block">
                                    <Image
                                        src={imageUrl || '/default-profile-picture.jpg'}
                                        alt="Profile"
                                        width={64}
                                        height={64}
                                        className="rounded-full"
                                    />
                                </label>

                                <button className="text-red-500 ml-2" onClick={handleImageDelete}>
                                    Delete
                                </button>
                            </div>
                        )}

                        <div className="mb-4">
                            <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
                        </div>
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
                            {/* {error && <p className="text-red-600 text-sm py-4">{error}</p>} */}
                        </div>

                        <div className='flex justify-between'>

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
                                {errorf && <p className="text-red-600 text-sm py-4">{errorf}</p>}
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
                                {errorl && <p className="text-red-600 text-sm pt-4">{errorl}</p>}
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
                                    value={email}
                                    onChange={(e) => handleEmail(e)}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                />

                                {wrongEmail && <p style={{ color: "red" }}>Wrong</p>}
                            </div>


                            <div className="mb-4 w-[45%]">
                                <label htmlFor="phoneNumber" className="block font-medium">
                                    Phone Number*
                                </label><br />
                                <PhoneInput
                                    country={"cm"}
                                    inputProps={{
                                        require: true
                                    }}
                                    value={phoneNumber}
                                    onChange={handlePhoneNumber}
                                />
                                {errorn && <p className="text-red-600 text-sm py-4">{errorn}</p>}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="bio" className="block font-medium">
                                Bio*
                            </label>
                            <textarea
                                id="bio"
                                value={bio}
                                onChange={handleBio}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                required></textarea>
                            {errorb && <p className="text-red-600 text-sm ">{errorb}</p>}
                        </div>

                        <Link href={"/dashboard/vieww"}>
                            <button className='text-white w-40 bg-blue px-4 py-2 rounded-md mt-10' onClick={submitData}>Submit</button>
                        </Link>
                    </div>

                )}

            </>
        </DdHeaderProvider >
    );
};

export default Profile;