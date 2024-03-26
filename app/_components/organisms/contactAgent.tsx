import Image from "next/image";
import agentAvatar from "../../../public/assets/images/istockphoto-1456194325-1024x1024.jpg"
import whatsap from "../../../public/assets/images/8010452_whatsapp_phone_communication_interaction_call_icon.png"
import call from "../../../public/assets/images/8725821_forwaded_call_icon.png"
import email from "../../../public/assets/images/4202011_email_gmail_mail_logo_social_icon.png"

const ContactPage = () => {
  return (
    <div className="aget">
      <h2 id="contactText">Contact Us</h2>
      <div className="contact-page">
        <div className="contact-avatar">
          <Image src={agentAvatar} id="contactCard" alt="Agent Avatar" layout="responsive" width={100} height={100} />
        </div>
        <div className="contact-form">
          <form>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Message"></textarea>
            <button type="submit">Send Message</button>
          </form>
          <div className="contact-icons">
            <a href="mailto:agent@example.com">
              <Image src={email} alt="Email Icon" />
            </a>
            <a href="tel:+123456789">
              <Image src={call} alt="Call Icon" />
            </a>
            <a href="https://wa.me/123456789">
              <Image src={whatsap} alt="WhatsApp Icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;