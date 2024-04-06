'use client'
import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";
import Link from "next/link";


const DropDownCard: React.FC = () => {
    return (
        <div>
            <ul className="w-28 shadow-lg p-4 rounded-lg space-y-4 bg-white text-gray-700">
                <Link href={"/dashboard/editproperty"}>
                    <li className="flex item-center gap-2 cursor-pointer"
                    >
                        <FaEdit /> Edit
                    </li>

                </Link>
                <Link href={"/dashboard/deleteproperty"}>
                <li className="flex item-center gap-2 cursor-pointer" >
                    <FaTrashAlt /> Delete
                </li>
                </Link>
                <li className="flex item-center gap-2 cursor-pointer">
                    <FaShare /> Share
                </li>
            </ul>
        </div>
    );
};

export default DropDownCard;