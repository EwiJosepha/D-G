// FilterBar.tsx 

import React from 'react';
import PropertyTypeFilter from './property-type';
import BedroomFilter from './bedrooms';

const FilterBar: React.FC = () => {

    return (
        <div>
            <div className="container mx-auto mt-10 mb-2 items-center justify-start md:mx-auto md:w-[67%] flex">
                {/* Filter buttons and dropdowns */}
                <PropertyTypeFilter />
                <BedroomFilter />


            </div>
        </div>
    );
};

export default FilterBar;