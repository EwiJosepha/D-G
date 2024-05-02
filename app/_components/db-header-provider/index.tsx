'use client';

import Link from "next/link";

interface Props {
    header?: string;
    children: React.ReactNode;
    only_header?: boolean;
}

export default function DdHeaderProvider({ children, only_header, header = '' }: Props) {
    return (
        <>
            {/* navbar content */}
            <div className="text-white h-32 bg-blue z-10 justify-between md:flex items-center md:mx-auto md:w-[80%] right-0 top-0 fixed md:pl-24 w-full px-2 md:px-0 shadow-lg md:shadow-none hidden">
                <div className="text-3xl font-mono font-bold">{header}</div>

                {/* Desktop Menu */}
                <div className="md:flex items-center space-x-20 pr-28">
                    <div className="relative group">
                        <Link href='/dashboard/addNewProperties' className="hidden md:block hover:text-gray-300 bg-orange-400 py-3 px-8 rounded-lg">Add Listings</Link>
                    </div>

                    {/* Avatar */}
                    <div className="flex items-center">
                        <img
                            src="av2.jpg"
                            alt="Avatar"
                            className="w-10 h-10 rounded-full cursor-pointer"
                        />
                    </div>
                </div>
            </div>
            {/* end of navbar content  */}
            {/* body Content */}
            <div className="bg-white w-full md:w-[83%] flex-col md:mt-40 md:mb-10 rounded-xl flex md:mx-auto overflow-y-scroll no-scrollbar pt-32 md:pt-0">{children}</div>

        </>
    )
}