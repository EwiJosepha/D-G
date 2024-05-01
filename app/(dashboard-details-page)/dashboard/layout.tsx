"use client";

import React, { useEffect, useState, useRef } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logOutUrl } from "@/app/utils/util";
import cookieSet from "@/app/utils/handle-search";
import Cookies from "js-cookie";
import {
    FaArrowAltCircleLeft,
    FaBars,
    FaPerbyte,
    FaPlus,
    FaRegEye,
    FaRegHeart,
    FaRegUser,
    FaTimes,
} from "react-icons/fa";
import { FaHouseFlag } from "react-icons/fa6";
import FooterLogo from "@/app/_components/organisms/footerLogo";
import { cookies } from "next/headers";


type Props = {
    children: ReactNode;
};

const DbLayout: React.FC<Props> = ({ children }) => {
    const router = useRouter();
    const [showSidebar, setShowSidebar] = useState(false);
    const [isProfileCreated, setIsProfileCreated] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const islocalstorageEmpty = localStorage.getItem("agentData");
        setIsProfileCreated(!!islocalstorageEmpty);

        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setShowSidebar(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
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

        console.log(res);
    };

    return (
        <div className="flex-none md:flex">

            {/* Sidebar toggle button */}
            <div className="w-screen fixed left-0
             right-0 bg-blue px-3 top-32 py-2 md:hidden">
                <div className="max-w-full relative">
                    <button className=" text-white p-2 rounded-md outline-none focus:border-gray-300  focus:border"
                        onClick={() => setShowSidebar(!showSidebar)}
                    >
                        {showSidebar ? (<FaTimes />) : (<FaBars />)}
                    </button>
                </div>
            </div>


            {/* Sidebar */}
            <div ref={sidebarRef} className={`flex-1 top-36 md:top-0 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 fixed md:static w-4/5 md:w-0 h-full md:h-0 transition-transform md:transition-none duration-300 md:duration-0 ease-in-out md:ease-linear ${showSidebar ? "p-12 md:p-0 transform translate-x-0 block" : "hidden"}`}>

                <div className="md:block w-full md:w-1/5 md:min-h-screen fixed top-0 left-0 md:bg-white bg-gray-100">
                    <div className=" hidden md:flex ">
                        <Link href="/landing" className="bg-blue md:ml-[20%] my-10">
                            <FooterLogo />
                        </Link>
                    </div>
                    <nav className="mt-1 text-lg font-sans pl-10">
                        <ul className="space-y-6 items-center text-xl justify-end font-serif ">
                            <li className="md:block md:border-y-2">
                                <Link href="/dashboard" legacyBehavior>
                                    <span
                                        className="flex items-center py-10 hover:underline cursor-pointer"
                                    >
                                        <FaPerbyte className="block mr-4 text-xl" />
                                        <span className="">Dashboard</span>
                                    </span>
                                </Link>
                            </li>

                            <li className="md:block md:border-b-2">
                                <p className="py-4 text-gray-500 hidden md:block">Profile</p>
                                {!isProfileCreated && <Link
                                    href="/dashboard/profile"
                                    legacyBehavior>
                                    <span
                                        className="flex hover:underline cursor-pointer items-center pt-4 pb-8"
                                    >
                                        <FaRegUser className="block mr-4 text-xl" />
                                        <span className="">Profile</span>
                                    </span>
                                </Link>
                                }

                                <Link
                                    href="/dashboard/vieww"
                                    legacyBehavior>
                                    <span
                                        className="flex hover:underline cursor-pointer items-center pt-4 pb-8"
                                    >
                                        <FaRegEye className="block mr-4 text-xl" />
                                        <span className="">View Profile</span>
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
                                        <span className="">My Properties</span>
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
                                        <span className="">Add New Property</span>
                                    </span>
                                </Link>
                            </li>
                            <li className="md:block md:border-b-2">
                                <Link
                                    href="/dashboard/favorite"
                                    legacyBehavior>
                                    <span className="hover:underline cursor-pointer items-center pt-4 pb-8 flex">
                                        <FaRegHeart className="block mr-4 text-xl" />
                                        <span className="">Favorite(s)</span>
                                    </span>
                                </Link>
                            </li>
                        </ul>
                        <div className="mt-auto">
                            <button className="flex items-center py-6 hover:text-orange-500" onClick={handleLogOut}>
                                <FaArrowAltCircleLeft className="block mr-3 text-4xl" />
                                <span className="">LogOut</span>
                            </button>
                        </div>
                    </nav>
                </div>
            </div>
            {/* end Sidebar */}

            {/* body content  */}
            <div className="md:w-[83.33%] w-full bg-blue min-h-screen ">
                <>
                    {children}
                </>
            </div>
        </div>
    );
};

export default DbLayout;