'use client'

import { createContext, useContext, useEffect, useState } from 'react';

import type { Dispatch, SetStateAction } from 'react';
import type { IPropertyInfo, IProfileInfo, FilterContextProps } from '@/interfaces/index';


interface IAppContext {
    propertyInfo: IPropertyInfo;
    //new
    profileInfo: IProfileInfo
    setPropertyInfo: Dispatch<SetStateAction<IPropertyInfo>>;
    setProfileInfo: Dispatch<SetStateAction<IProfileInfo>>
    filteredData: IPropertyInfo[]
    setFilteredData: Dispatch<SetStateAction<IPropertyInfo[]>>;
}

export const  AppContext = createContext<FilterContextProps>({
    showFilters: false,
    selectedStatus: null,
    setSelectedStatus: () => {},
    toggleFilters: () => {}
});

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [propertyInfo, setPropertyInfo] = useState<IPropertyInfo>({
        id: 0,
        name: "",
        type: "",
        description: "",
        rooms: "",
        bath: 0,
        livingRooms: "",
        location: "",
        price: 0,
        areaInKm: 0,
        rentOrSale: "",
        shortDescription: "",
        images: [],
        agentId: 0
    });

    const [profileInfo, setProfileInfo] = useState<IProfileInfo>({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        bio: ""
    })

    const [filteredData, setFilteredData] = useState<IPropertyInfo[]>([])
    const [showFilters, setShowFilters] = useState(false);
    const[ selectedStatus, setSelectedStatus]=useState(null)

    const toggleFilters = () => {
      setShowFilters((prev) => !prev);
    };



    useEffect(() => {
        if (profileInfo) localStorage.setItem('propertyInfo', JSON.stringify(profileInfo));
    }, [profileInfo])

    return (
        <AppContext.Provider value={{
            // propertyInfo,
            // setPropertyInfo,
            // profileInfo,
            // setProfileInfo,
            // filteredData,
            // setFilteredData,
            showFilters,
            selectedStatus,
            setSelectedStatus,
             toggleFilters 
        }}>
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => useContext(AppContext) as FilterContextProps;

export {
    AppContextProvider,
    useAppContext,
}
