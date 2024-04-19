// FilterBar.tsx 

import React, { useEffect, useState } from 'react';
import PropertyTypeFilter from './property-type';
import BedBathFilter from './bed-bathrooms';
import PriceRangeFilter from './price-range';
import PropertySizeFilter from './property-size';
import StatusFilter from './status-filter';
import { BsFilter } from 'react-icons/bs';

const FilterBar: React.FC = () => {
    const[showstatus, setShowstatus] = useState(false)
    useEffect(()=>{
        setShowstatus(true)
        console.log("hey");
        
    },[])

    return (
        <div className='bg-gray-100 pt-6 pb-3'>
            <h1 className='text-blue ml-[16%] font-mono flex items-center'> <BsFilter className='mr-2 text-2xl' /> FILTER BY:</h1>
            <div className="container mx-auto mt-3 mb-2 items-center justify-start md:mx-auto md:w-[67%] flex">
                {/* Filter buttons and dropdowns */}
                <PropertyTypeFilter />
                <BedBathFilter />
                <PriceRangeFilter />
                <PropertySizeFilter />
                <StatusFilter  showstatus={showstatus}/>
            </div>
        </div>
    );
};

export default FilterBar;