"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaTimes } from 'react-icons/fa';
import { loginUrl } from '../utils/util';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import cookieSet from '../utils/handle-search';
import { NextRequest } from 'next/server';




const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [badreq, setBadreq] = useState(Boolean)
    const [succesful, setSuccesful] = useState(Boolean)
    const [redirected, setRedirected] = useState(Boolean)
    const router = useRouter()



    const handleRegister = async (e: any,) => {
        e.preventDefault()

        const formData = {
            email,
            hashpassword: password
        }

        const res = await fetch(loginUrl, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
      const badrequest = res.status === 400
        const goodreq = res.status === 201
        setBadreq(badrequest)
        setSuccesful(goodreq)


        if (goodreq) {
            const response = await res.json().then((data) => data).then((message) => message);
            const token = response.message;
            const decoded = jwtDecode(token);
            const cokie = cookieSet(token)

            console.log(decoded);
            if (typeof localStorage !== "undefined") {
                localStorage.setItem("decoded", JSON.stringify(decoded))
            }

            router.push('/dashboard')
        }
    }



    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue">
            <div className="bg-white w-96 p-10 rounded shadow">
                <div className='items-center flex justify-between mb-6'>
                    <h2 className="text-2xl font-bold">Login</h2>
                    <Link href='/' passHref ><FaTimes /></Link>
                </div>
                <form onSubmit={handleRegister}>
                    {badreq && <div className=' color-red-800 font-medium text-red-600'>wrong credentials try again!!!</div>}<br />

                    {succesful && <div className=' color-red-800 font-medium text-green-700'>Login succesful</div>}<br />

                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 font-medium">
                            Email
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}

                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 font-medium">
                            Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue text-white py-2 px-4 rounded hover:bg-blue transition-colors duration-300">
                        Login
                    </button>
                </form>
                <p className="text-sm text-gray-600 mt-4">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-blue-500 hover:text-blue-600">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;