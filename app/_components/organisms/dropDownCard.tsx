'use client'
import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";
import Link from "next/link";
import Popup from "../molecules/popup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProp } from "@/app/utils/util";


const DropDownCard: React.FC = () => {
    const router = useRouter()
    const [openModal, setOpenModal] = useState(false)

    // if (!open) return null;

    function isModalOpen() {
        setOpenModal(true)
        console.log("hey");

    }
    function isModalClose() {
        setOpenModal(false)
    }

    function deleteListing() {
        const reqbody = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },

        }

        fetch(deleteProp, reqbody).then((res) => {
            if (!res.ok) {
                throw new Error("failed to delete")
            }
            return res.json()
        }).then((data) => {
            if (data.status === 200) {
                console.log("deleted succesfully");

            }
        }).catch((er) => {
            console.log(er);

        })

        router.push("/myProperties")
    }

    return (
        <div>
            <ul className="w-28 shadow-lg p-4 rounded-lg space-y-4 bg-white text-gray-700">
                <Link href={"/dashboard/editproperty"}>
                    <li className="flex item-center gap-2 cursor-pointer mb-5"
                    >
                        <FaEdit /> Edit
                    </li>

                </Link>

                <li className="flex item-center gap-2 cursor-pointer" >
                    <FaTrashAlt onClick={isModalOpen} /> Delete
                </li>

                <li className="flex item-center gap-2 cursor-pointer">
                    <FaShare /> Share
                </li>
            </ul>
            {openModal && (
                <Popup onClose={isModalClose}>
                    <p className="mb-10 text-xl font-bold">Are you sure you want to delete this listing?</p>
                    <div className="flex justify-between">
                        <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={deleteListing}>
                            Delete
                        </button>
                        <button className="bg-blue text-white px-4 py-2 rounded" onClick={isModalClose}>
                            Cancel
                        </button>
                    </div>
                </Popup>
            )}
        </div>
    );
};

export default DropDownCard;