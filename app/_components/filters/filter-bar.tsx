// FilterBar.tsx
import React, { useState } from 'react';
import { Property, FilterOptions } from '@/app/types';

interface FilterBarProps {
    properties: Property[];
    onFilter: (filteredProperties: Property[]) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ properties, onFilter }) => {
    const [filters, setFilters] = useState<FilterOptions>({
        propertyType: [],
        bedrooms: [],
        bathrooms: [],
        priceRange: {
            min: 0,
            max: 0,
        },
        size: {
            min: 0,
            max: 0,
        },
        status: [],
    });

    const handleFilterChange = (updatedFilters: FilterOptions) => {
        setFilters(updatedFilters);
        const filteredProps = filterProperties(properties, updatedFilters);
        onFilter(filteredProps);
    };

    const handleReset = () => {
        setFilters({
            propertyType: [],
            bedrooms: [],
            bathrooms: [],
            priceRange: {
                min: 0,
                max: 0,
            },
            size: {
                min: 0,
                max: 0,
            },
            status: [],
        });
        onFilter(properties);
    };

    const filterProperties = (props: Property[], filters: FilterOptions): Property[] => {
        let filteredProps = [...props];

        // Filter by property type
        if (filters.propertyType.length > 0) {
            filteredProps = filteredProps.filter((prop) => filters.propertyType.includes(prop.type));
        }

        // Filter by bedrooms
        if (filters.bedrooms.length > 0) {
            filteredProps = filteredProps.filter((prop) => filters.bedrooms.includes(prop.bedrooms));
        }

        // Add more filtering logic here...

        return filteredProps;
    };

    return (
        <div className="container mx-auto my-10 items-center justify-center md:mx-auto md:w-[67%] ">
            {/* Filter buttons and dropdowns */}
            <button onClick={handleReset}>Reset Filters</button>
        </div>
    );
};

export default FilterBar;