// FilterBar.tsx
import React, { useState } from 'react';
import { Property, FilterOptions } from '@/app/types';
import PropertyTypeFilter from './property-type';

// interface FilterBarProps {
//     properties: Property[];
//     onFilter: (filteredProperties: Property[]) => void;
// }

const FilterBar: React.FC = () => {


    // const handleFilterChange = (updatedFilters: FilterOptions) => {
    //     setFilters(updatedFilters);
    //     const filteredProps = filterProperties(properties, updatedFilters);
    //     onFilter(filteredProps);
    // };


    return (
        <div>
            <div className="container mx-auto my-10 items-center justify-center md:mx-auto md:w-[67%] ">
                {/* Filter buttons and dropdowns */}
                <PropertyTypeFilter />

                <button >Reset Filters</button>
            </div>
        </div>
    );
};

export default FilterBar;