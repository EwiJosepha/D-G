'use client'

import React, { useEffect, useState } from "react";
import Navbar from "../_components/organisms/navbar";
import Footer from "../_components/organisms/footer";
import CardData from "../_components/organisms/cardData";
import FilterBar from "@/components/filters/filter-bar";
import StatusFilter from "@/components/filters/status-filter";
import { useContext } from "react";
import { AppContext } from "@/store/app-context";
import { statusFilter } from "../utils/util";


const PropertyPage: React.FC = () => {
    const { showFilters, selectedStatus } = useContext(AppContext)
    const [updatestatus, setUpdatetatus] = useState("")
    const [statusFromLc, setStatusFromLc] = useState("")
    const {data:status}=statusFilter(statusFromLc)


    useEffect(() => {
        if (typeof localStorage !== "undefined") {
            const lc = localStorage.getItem("status");
            console.log("Data from local storage:", lc);
            if (lc) {
                const parsedData = JSON.parse(lc);
                setUpdatetatus(parsedData);
            }
        }
    }, [updatestatus]);

    console.log("sta",selectedStatus);
    console.log("hey");
    
    
    // console.log("stausfromLc",statusFromLc);
    
    
    return (
        <>
            <Navbar />
            <div>
                 <FilterBar />
                <CardData showLink={false} />
                {selectedStatus}
           
            </div>
            <Footer />
        </>
    );
};

export default PropertyPage;