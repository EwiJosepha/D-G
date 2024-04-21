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


export type {
    IProfileInfo,
}

interface IFilters {
    rooms?: number;
    baths?: number;
    areaInKm?: number;
    price?: number;
    type?: string;
    rentOrSale?: string;
}

export type {
    IFilters,
}