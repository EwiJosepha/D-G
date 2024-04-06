'use client'

import ContactPage from "@/components/organisms/contactAgent";
import Footer from "@/components/organisms/footer";
import DetailNav from "@/components/organisms/detailNav";
import DetailHero from "@/components/organisms/detailHero";
import DescriptionPage from "@/components/organisms/description";
import AnimatePage from "@/app/_components/molecules/animate";

const DetailPage: React.FC = () => {

    return (
        <div>
            <DetailNav />
            <DetailHero />
            <DescriptionPage />
            <ContactPage />
            <AnimatePage />
            <Footer />
        </div>
    );
};

export default DetailPage;