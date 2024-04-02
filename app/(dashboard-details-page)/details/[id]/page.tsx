'use client'
import DetailNav from "@/components/organisms/detailNav";
import DetailHero from "@/components/organisms/detailHero";
import { useAppContext } from "@/app/_core/store/app-context";
import ContactPage from "@/components/organisms/contactAgent";
import Footer from "@/components/organisms/footer";
import DescriptionPage from "@/app/_components/organisms/description";



const DescriptionPagee: React.FC = () => {

  return (
    <>
      <DetailNav />
      <DetailHero />
      <DescriptionPage />
      <ContactPage />
      <Footer />
    </>);
};

export default DescriptionPagee;