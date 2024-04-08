import React from "react";
import Navbar from "../_components/organisms/navbar";
import HeroSection from "../_components/organisms/hero";
import InfoSection from "../_components/organisms/infoSection";
import CardData from "../_components/organisms/cardData";
import Footer from "../_components/organisms/footer";

const LandingPage: React.FC = () => {

    return (
        <div>
            <Navbar />
            <HeroSection />
            <InfoSection />
            <CardData />
            <Footer />
        </div>
    );
};

export default LandingPage;