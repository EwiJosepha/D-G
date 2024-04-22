interface IPropertyInfo {
    id: number;
    name: string;
    type: string;
    description: string;
    rooms: string;
    bath: number;
    livingRooms: string;
    location: string;
    price: number;
    areaInKm: number;
    rentOrSale: string;
    shortDescription: string;
    images: string[];
    agentId: number;
}

export type {
    IPropertyInfo,
}

interface IProfileInfo {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    bio: string
}

// interface FilterContextProps {
//     showFilters: boolean,
//     selectedStatus: string | null,
//     setSelectedStatus: (status: string | null) => void,
//     toggleFilters: () => void
// }


export type {
    IProfileInfo,
}

interface IFilters {
    rooms: number;
    bath: number;
    areaInKm: number;
    price: number;
    type: string;
    rentOrSale: string;
}

export type {
    IFilters,
    FilterContextProps
}