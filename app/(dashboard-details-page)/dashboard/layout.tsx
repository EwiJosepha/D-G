"use client";

import React from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logOutUrl } from "@/app/utils/util";
import cookieSet from "@/app/utils/handle-search";
import Cookies from "js-cookie";
import {
    FaArrowAltCircleLeft,
    FaPerbyte,
    FaPlus,
    FaRegHeart,
    FaRegUser,
} from "react-icons/fa";
import { FaHouseFlag } from "react-icons/fa6";
import FooterLogo from "@/app/_components/organisms/footerLogo";
import { cookies } from "next/headers";

type Props = {
    children: ReactNode;
};

 const DbLayout: React.FC<Props> = ({ children }) => {
    const router = useRouter();
    

    const handleLogOut = async () => {
        const res = await fetch(logOutUrl, {
            method: "GET",
            mode: "cors",
            headers: {
                "content-type": "application/Json"
            },
        })

        if(res.status !== 200){
            return <div>Failed to logOut</div>
        }

        if(res.status === 200){
            router.push("/")
            
            localStorage.removeItem("decoded")
            Cookies.remove("token")
        }
    
        console.log(res);
    }
  
    

    return (
        <div className="flex-none md:flex">

            {/* Sidebar */}
            <div className="md:block w-full md:w-1/5 md:h-screen md:relative">
                {/* Logo */}
                <button className="bg-blue md:ml-[12%] my-14">
                    <FooterLogo />
                </button>

                <nav className="mt-1 bg-white text-lg flex md:flex-col font-sans pl-10">
                    <ul className="space-y-6 flex md:flex-col md:flex-none">
                        <li className="md:block md:border-y-2">
                            <Link
                                href="/dashboard"
                                legacyBehavior>
                                <span
                                    className="flex items-center py-10 hover:underline cursor-pointer"
                                >
                                    <FaPerbyte className="block mr-4 text-xl" />
                                    <span className="hidden md:inline">Dashboard</span>
                                </span>
                            </Link>
                        </li>

                        <li className="md:block md:border-b-2">
                            <p className="py-4 text-gray-500 hidden md:block">Profile</p>
                            <Link
                                href="/dashboard/profile"
                                legacyBehavior>
                                <span
                                    className="flex hover:underline cursor-pointer items-center pt-4 pb-8"
                                >
                                    <FaRegUser className="block mr-4 text-xl" />
                                    <span className="hidden md:inline">Profile</span>
                                </span>
                            </Link>
                       
                            <Link
                                href="/dashboard/vieww"
                                legacyBehavior>
                                <span
                                    className="flex hover:underline cursor-pointer items-center pt-4 pb-8"
                                >
                                    <FaRegUser className="block mr-4 text-xl" />
                                    <span className="hidden md:inline">View Profile</span>
                                </span>
                            </Link>
                            <Link
                                href="/dashboard/edit"
                                legacyBehavior>
                                <span
                                    className="flex hover:underline cursor-pointer items-center pt-4 pb-8"
                                >
                                    <FaRegUser className="block mr-4 text-xl" />
                                    <span className="hidden md:inline">Edit Profile</span>
                                </span>
                            </Link>
                        </li>
                        <li className="md:block">
                            <p className="py-4 text-gray-500 hidden md:block">Listings</p>
                            <Link
                                href="/dashboard/myProperties"
                                legacyBehavior>
                                <span
                                    className="flex hover:underline cursor-pointer items-center py-4"
                                >
                                    <FaHouseFlag className="block mr-4 text-xl" />
                                    <span className="hidden md:inline">My Properties</span>
                                </span>
                            </Link>
                        </li>
                        <li className="md:block">
                            <Link
                                href="/dashboard/addNewProperties"
                                legacyBehavior>
                                <span
                                    className="flex hover:underline cursor-pointer items-center"
                                >
                                    <FaPlus className="block mr-4 text-xl" />
                                    <span className="hidden md:inline">Add New Property</span>
                                </span>
                            </Link>
                        </li>
                        <li className="md:block md:border-b-2">
                            <Link
                                href="/dashboard/favorite"
                                legacyBehavior>
                                <span className="hover:underline cursor-pointer items-center pt-4 pb-8 flex">
                                    <FaRegHeart className="block mr-4 text-xl" />
                                    <span className="hidden md:inline">Favorite(s)</span>
                                </span>
                            </Link>
                        </li>
                    </ul>
                    <div className="mt-auto">
                        <button className="flex items-center py-6 hover:text-orange-500" onClick={handleLogOut}>
                            <FaArrowAltCircleLeft className="block mr-3 text-4xl" />
                            <span className="hidden md:inline">LogOut</span>
                        </button>
                    </div>
                </nav>
            </div>
            {/* end Sidebar */}

            {/* body content  */}
            <div className="md:w-[83.33%] w-full bg-blue overflow-hidden h-full">
                <>
                    {children}
                </>
            </div>
        </div>
    );
};

export default DbLayout;
