'use client'

import React, { useState } from "react";
import Navbar from "../_components/organisms/navbar";
import Footer from "../_components/organisms/footer";
import CardData from "../_components/organisms/cardData";
import FilterBar from "@/components/filters/filter-bar";
import { Property } from "../types";

const properties: Property[] = [
    //
]

const PropertyPage: React.FC = () => {
    const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties)

    const handleFilter = (filteredProps: Property[]) => {
        setFilteredProperties(filteredProps);
    };

    return (
        <>
            <Navbar />
            <div>
                <FilterBar properties={properties} onFilter={handleFilter} />
                <CardData showLink={false} />
            </div>
            <Footer />
        </>
    );
};

export default PropertyPage;