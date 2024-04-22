'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { IPropertyInfo, IProfileInfo, IFilters, FilterContextProps } from '@/interfaces/index';
import axios from 'axios';
import { API_BASE_URL } from '@/app/service/constant';

interface IAppContext {
    propertyInfo: IPropertyInfo[];
    profileInfo: IProfileInfo;
    filters: IFilters;
    setPropertyInfo: Dispatch<SetStateAction<IPropertyInfo[]>>;
    setProfileInfo: Dispatch<SetStateAction<IProfileInfo>>;
    setFilters: Dispatch<SetStateAction<IFilters>>;
    applyFilters: (properties: IPropertyInfo[], filters: IFilters) => IPropertyInfo[];
}

export const AppContext = createContext<FilterContextProps>({
    showFilters: false,
    selectedStatus: null,
    setSelectedStatus: () => { },
    toggleFilters: () => { }
});

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [propertyInfo, setPropertyInfo] = useState<IPropertyInfo[]>([]);
    const [profileInfo, setProfileInfo] = useState<IProfileInfo>({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        bio: ""
    });
    const [filters, setFilters] = useState<IFilters>({
        rooms: 0,
        bath: 0,
        areaInKm: 0,
        price: 0,
        type: '',
        rentOrSale: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseUrl = API_BASE_URL + '/properties';
                const queryParams = new URLSearchParams();

                // Iterate over the filters object and append each key-value pair to the URLSearchParams
                Object.entries(filters).forEach(([key, value]) => {
                    if (value) {
                        queryParams.append(key, String(value));
                    }
                });

                const url = `${baseUrl}?${queryParams}`;
                const response = await axios.get<IPropertyInfo[]>(url);
                setPropertyInfo(response.data);
            } catch (error) {
                console.error('Error fetching property data:', error);
            }
        };

        fetchData();
    }, [filters]);

    const [filteredData, setFilteredData] = useState<IPropertyInfo[]>([])
    const [showFilters, setShowFilters] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null)

    const toggleFilters = () => {
        setShowFilters((prev) => !prev);
    };



    useEffect(() => {
        if (profileInfo) localStorage.setItem('propertyInfo', JSON.stringify(profileInfo));
    }, [profileInfo]);

    // Function to apply filters to propertyInfo
    const applyFilters = (properties: IPropertyInfo[], filters: IFilters): IPropertyInfo[] => {
        return properties.filter(property => {
            // Convert rooms from string to number
            const rooms = parseInt(property.rooms);

            const roomsMatch = filters.rooms ? rooms === filters.rooms : true;
            const bathMatch = filters.bath ? property.bath === filters.bath : true;
            const areaMatch = filters.areaInKm ? property.areaInKm === filters.areaInKm : true;
            const priceMatch = filters.price ? property.price === filters.price : true;
            const typeMatch = filters.type ? property.type === filters.type : true;
            const rentOrSaleMatch = filters.rentOrSale ? property.rentOrSale === filters.rentOrSale : true;

            return roomsMatch && bathMatch && areaMatch && priceMatch && typeMatch && rentOrSaleMatch;
        });
    };

    return (
        <AppContext.Provider value={{
            propertyInfo,
            setPropertyInfo,
            profileInfo,
            setProfileInfo,
            filters,
            setFilters,
            applyFilters,
        }}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = (): IAppContext => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
};

export { AppContextProvider, useAppContext };