'use-client'
import Image from "next/image";
import agentAvatar from "@/public/assets/images/realestate-listing/istockphoto-1456194325-1024x1024.jpg"
import whatsap from "@/public/assets/images/realestate-listing/8010452_whatsapp_phone_communication_interaction_call_icon.png"
import call from "@/public/assets/images/realestate-listing/8725821_forwaded_call_icon.png"
import email from "@/public/assets/images/realestate-listing/4202011_email_gmail_mail_logo_social_icon.png"
import { agentdata } from "@/app/utils/util";
import { useState, useEffect } from "react";
import Link from "next/link";

interface FormData {
  phoneNumber: number;
  imageUrl: string
}

const ContactPage = () => {
  const { data } = agentdata()
  const [formInfo, setFormInfo] = useState<FormData>()
  const agentemail = data?.email
  const phoneNum = formInfo?.phoneNumber
  const agentwatsapNum = formInfo?.phoneNumber

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const storedData = localStorage.getItem('agentData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setFormInfo(parsedData);
        // console.log("parsed data", parsedData);
      }
    }
  }, []);


  const sendEmail = () => {
    window.location.href = `mailto:${agentemail}`
  }

  const sendWhatsapmsg = () => {
    window.location.href = `https://wa.me/${agentwatsapNum}`
  }

  const makePhoneCall = () => {
    window.location.href = `tel: ${phoneNum}`
  }

  return (
    <div className=" bg-blue min-h-screen pt-20 text-white">
      <h2 className="text-center text-3xl font-bold text-white mb-16">Contact Real Estate Agent</h2>
      <div className="flex flex-col md:flex-row justify-center">
        <div className="w-96 h-96 relative">
          <Image src={formInfo?.imageUrl || agentAvatar} alt="Agent Avatar" layout="responsive" objectFit="cover" width={200} height={200} />
        </div>
        <div className="w-full bg-white p-6 md:w-1/2 md:ml-5 mt-5 md:mt-0">
          <h1 className="text-blue font-bold text-xl my-5 ">Contact Us Here 📲</h1>
          <form className="gap-6">
            <input className="border border-gray-300 rounded px-3 py-2 w-full mb-2" type="text" placeholder="Your Name" />
            <input className="border border-gray-300 rounded px-3 py-2 w-full mb-2" type="email" placeholder="Your Email" />
            <textarea className="border border-gray-300 rounded px-3 py-2 w-full mb-2" placeholder="Message"></textarea>
            <button className=" text-white bg-blue px-4 py-2 rounded w-full my-10" type="submit">Send Message</button>
          </form>
          <div className="contact-icons flex justify-center mt-5">
            <Link href="#" onClick={sendEmail} className="mx-2">
              <Image src={email} alt="Email Icon" width={40} height={40} />
            </Link>
            <Link href="#" onClick={makePhoneCall} className="mx-2">
              <Image src={call} alt="Call Icon" width={40} height={40} />
            </Link>
            <Link href="#" onClick={sendWhatsapmsg} className="mx-2">
              <Image src={whatsap} alt="WhatsApp Icon" width={40} height={40} />
            </Link>
          </div>
        </div>
      </div>

      <div className="items-center justify-center w-[50%] mt-10 flex flex-col text-xl font-serif ml-[25%]">

        <h2>Get in contact with the ownerr of this listings and schedule a meetup.</h2>

        <h4 className="text-sm text-black font-extrabold">Or</h4>

        <h2> Send a message to D&J Collections if you haven't found your dream home and live a description of what you want. </h2>
        <h2>We will attend to you as soon as we recieve you message. </h2>

        <h1 className="text-3xl font-extrabold text-orange-600 pt-5">Thank You!</h1>

      </div>


    </div>
  );
};

export default ContactPage;
