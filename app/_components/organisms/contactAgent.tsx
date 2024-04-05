'use-client'
import Image from "next/image";
import agentAvatar from "../../../public/assets/images/istockphoto-1456194325-1024x1024.jpg"
import whatsap from "../../../public/assets/images/8010452_whatsapp_phone_communication_interaction_call_icon.png"
import call from "../../../public/assets/images/8725821_forwaded_call_icon.png"
import email from "../../../public/assets/images/4202011_email_gmail_mail_logo_social_icon.png"
import { agentdata } from "@/app/utils/util";
import { useState, useEffect } from "react";
import Link from "next/link";

interface FormData {
  phoneNumber: number;
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
        console.log("parsed data", parsedData);
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
    <div className="aget">
      <h2 id="contactText">Contact Real Estate Agent</h2>
      <div className="contact-page md:flex">
        <div className="contact-avatar">
          <Image src={agentAvatar} id="contactCard" alt="Agent Avatar" layout="responsive" width={100} height={100} />
        </div>
        <div className="contact-form w-full md:w-[55%] mt-5 md:mt-0">
          <form>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Message"></textarea>
            <button type="submit">Send Message</button>
          </form>
          <div className="contact-icons">
            <Link href="#" onClick={sendEmail}>
              <Image src={email} alt="Email Icon" />
            </Link>
            <Link href="#" onClick={makePhoneCall}>
              <Image src={call} alt="Call Icon" />
            </Link>
            <Link href="#" onClick={sendWhatsapmsg}>
              <Image src={whatsap} alt="WhatsApp Icon" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;