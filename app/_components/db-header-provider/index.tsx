'use client';

interface Props {
    header?: string;
    children: React.ReactNode;
    only_header?: boolean;
}

export default function DdHeaderProvider({ children, only_header, header = '' }: Props) {
    return (
        <>
            {/* navbar content */}
            <div className="text-white h-32 bg-blue z-10 justify-between flex items-center md:mx-auto md:w-[80%] top-0 fixed">
                <div className="text-3xl font-mono font-bold pl-1 md:pl-28">{header}</div>

                {/* Desktop Menu */}
                <div className="md:flex items-center space-x-20 pr-28">
                    <div className="relative group">
                        <button className="hidden md:block hover:text-gray-300">Add Listings</button>
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
            <div className="bg-white w-full md:w-[83%] flex-col md:mt-40 mb-10 rounded-xl flex md:mx-auto">{children}</div>

        </>
    )
}