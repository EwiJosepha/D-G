'use client'

import React from "react";
import Navbar from "../_components/organisms/navbar";
import Footer from "../_components/organisms/footer";
import CardData from "../_components/organisms/cardData";
import PropertyTypeFilter from "@/components/filters/property-type";

const PropertyPage: React.FC = () => {

    return (
        <>
            <Navbar />
            <div>

                <PropertyTypeFilter />
                {/* <FilterBar /> */}
                <CardData showLink={false} />
            </div>
            <Footer />
        </>
    );
};

export default PropertyPage;