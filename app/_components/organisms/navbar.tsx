"use client";

import React from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
    FaBars,
    FaLockOpen,
    FaRegUserCircle,
    FaTimes,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FooterLogo from "./footerLogo";
import { logOutUrl } from "@/app/utils/util";

const Navbar: React.FC = () => {
    const router = useRouter();
    const [isAgentSign, setIsAgentSign] = useState(false);
    const [navbar, setNavbar] = useState(false)

    useEffect(() => {
        if (typeof localStorage !== "undefined") {
            const decoded = JSON.parse(localStorage.getItem("decoded") as string);
            if (decoded) {
                setIsAgentSign(true);
            }
        }
    }, []);

    const handleLogOut = async () => {
        const res = await fetch(logOutUrl, {
            method: "GET",
            mode: "cors",
            headers: {
                "content-type": "application/Json",
            },
        });

        if (res.status !== 200) {
            return <div>Failed to logOut</div>;
        }

        if (res.status === 200) {
            router.push("/");

            localStorage.removeItem("decoded");
            Cookies.remove("token");
        }
    };

    return (
        <>
            <nav className="bg-blue w-screen fixed top-0 left-0
             right-0 z-10 shadow-lg">

                <div className="container mx-auto justify-between px-4 lg:max-w-7xl md:items-center md:flex">

                    <>
                        <div className="flex items-center justify-between py-3 md:py-5 md:block max-w-full">
                            {/* LOGO */}
                            <FooterLogo />
                            <div className="md:hidden">
                                <button className="p-2 text-white rounded-md outline-none focus:border-gray-300 focus:border"
                                    onClick={() => setNavbar(!navbar)}
                                >{navbar ? (<FaTimes />) : (<FaBars />)}
                                </button>
                            </div>
                        </div>
                    </>

                    <>
                        <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? 'p-12 md:p-0 block' : 'hidden'
                            }`}>

                            <ul className="h-screen md:h-auto items-center text-xl justify-end font-serif md:flex ">

                                <li className="pb-6 py-4 md:px-6 text-center border-b-2 md:border-b-0">
                                    <Link href="/property" className="text-white md:hover:text-gray-400">
                                        Home
                                    </Link>
                                </li>

                                <li className="pb-6 py-4 md:px-6 text-center border-b-2 md:border-b-0">
                                    <Link href="/property" className="text-white md:hover:text-gray-400">
                                        Properties
                                    </Link>
                                </li>
                                {isAgentSign ? (
                                    <>
                                        <li className="pb-6 py-4 md:px-6 text-center border-b-2 md:border-b-0">
                                            <Link href="/dashboard" className="text-white md:hover:text-gray-400">
                                                Dashboard
                                            </Link>
                                        </li>

                                        <li className="pb-6 py-4 md:px-6 text-center border-b-2 md:border-b-0">
                                            <button
                                                className="flex items-center py-6 text-white md:hover:text-gray-400"
                                                onClick={handleLogOut}
                                            >
                                                <FaLockOpen className="block mr-3 text-xl" />
                                                <span className="hidden md:inline">LogOut</span>
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="pb-6 py-4 md:px-6 text-center border-b md:border-b-0">
                                            <button className="text-white md:hover:text-gray-400">
                                                Contact Us
                                            </button>
                                        </li>

                                        <li className="pb-6 py-4 md:px-6 text-center border-b-2 md:border-b-0">
                                            <Link href="/login">
                                                <span className="relative text-white flex items-center justify-center md:hover:text-gray-400 font-extrabold md:font-normal">
                                                    <FaRegUserCircle className="mr-2 text-2xl" />
                                                    <button>Log In</button>
                                                </span>
                                            </Link>
                                        </li>  </>
                                )}
                            </ul>
                        </div>
                    </>
                </div>
            </nav >
        </>
    );
};

export default Navbar;
