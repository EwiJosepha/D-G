'use client'

import React from 'react';
import { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { FaArrowAltCircleLeft, FaBars, FaLockOpen, FaRegUserCircle, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FooterLogo from './footerLogo';
import MobileMenu from './mobileMenu';
import { logOutUrl } from '@/app/utils/util';


const Navbar: React.FC = () => {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAgentSign, setIsAgentSign] = useState(false)


    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen((prevIsMobileMenuOpen) => !prevIsMobileMenuOpen)
    };

    useEffect(() => {
        if (typeof localStorage !== "undefined") {
            const decoded = JSON.parse(localStorage.getItem("decoded") as string)
            if (decoded) {
                setIsAgentSign(true)
            }
        }
    }, [])

    const handleLogOut = async () => {
        const res = await fetch(logOutUrl, {
            method: "GET",
            mode: "cors",
            headers: {
                "content-type": "application/Json"
            },
        })

        if (res.status !== 200) {
            return <div>Failed to logOut</div>
        }

        if (res.status === 200) {
            router.push("/")

            localStorage.removeItem("decoded")
            Cookies.remove("token")
        }

        console.log(res);
    }

    return (
        <nav className="bg-blue py-5">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16 py-5">
                    {/* Logo */}
                    <div className='py-2'>
                        <FooterLogo />
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden lg:hidden">
                        <button
                            onClick={handleMobileMenuToggle}
                            className="text-white hover:text-gray-300"
                        >
                            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-20">
                        <div className="relative">
                            <Link href="/property" className="text-white hover:text-gray-300">
                                Properties
                            </Link>
                        </div>
                        <div className="relative">
                            <Link href="/dashboard" className="text-white hover:text-gray-400">
                                Dashboard
                            </Link>
                        </div>
                        {!isAgentSign && (<div className="relative group">
                            <button className="text-white hover:text-gray-300">Contact Us</button>
                        </div>)}

                        {isAgentSign && (<div className='relative'>
                            <button className="flex items-center py-6 text-white hover:text-gray-400" onClick={handleLogOut}>
                                <FaLockOpen className="block mr-3 text-xl" />
                                <span className="hidden md:inline">LogOut</span>
                            </button>
                        </div>)}

                        {!isAgentSign &&
                            <Link href='/login' >
                                <span className="relative text-white flex items-center justify-center">
                                    <FaRegUserCircle className='mr-2 text-2xl' />
                                    <button className=" hover:text-gray-300">Log In</button>
                                </span>

                            </Link>
                        }

                    </div>


                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 bg-blue text-white w-[90%] h-fit p-6">
                    <MobileMenu onClose={handleMobileMenuToggle} />
                </div>
            )}
        </nav>
    );
};

export default Navbar;

