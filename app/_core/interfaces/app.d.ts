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

interface FilterContextProps {
    showFilters: boolean;
    selectedStatus: null,
    setSelectedStatus: Dispatch<SetStateAction<string | null>>,
    toggleFilters: () => void;
  }

export type {
    IProfileInfo
}
export type {
    FilterContextProps
}