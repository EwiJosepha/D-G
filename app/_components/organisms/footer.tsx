import React from 'react'
import Image from 'next/image'
import facebook from "@/public/assets/images/realestate-listing/5365678_fb_facebook_facebook logo_icon.png";
import instagram from '@/public/assets/images/realestate-listing/5296765_camera_instagram_instagram logo_icon.png'

import FooterLogo from './footerLogo'

function Footer() {
  return (
    <div>
      <div className="bg-blue text-white pb-6">
        <div className="footerlogoWrapper">
          <div className="footerLogo">
            <div className="flexWrapper ml-12">
              <FooterLogo />
              <div className="fcbFooter">
                <Image src={facebook} alt="facebookLogo" width={20} height={20} />
                <Image src={instagram} alt="Instagram" width={20} height={20} />
              </div>
            </div>
            <div className="footerLog">
              <span id="lineheight">D&J</span>
              <span id="lineheight">Real Estate</span>
              <span id="lineheight">Africa</span>
              <span id="lineheight">Cameroon</span>
            </div>
            <div className="footerLogoo">
              <span id="lineheight">Become an Agent</span>
              <span id="lineheight">Promotions</span>
              <span id="lineheight">Why Choose Us</span>
              <span id="lineheight">About us</span>
            </div>
          </div>

          <div className="djFooter flex items-center justify-between md:mx-auto md:w-3/4 lg:w-2/3">
            <div className="copyright">
              <p><span id="copy">@</span> D&J 20024 Reservered Rights</p>
            </div>
            <div className="report">
              <div className="channel">
                <p>Reporting Channel</p>
              </div>
              <div className="channel1">
                <p>Privacy Policy</p>
              </div>
              <div className="channel2">
                <p>Terms of condition</p>
              </div>
              <div className="channel3">
                <p>Access your Personal Data</p>
              </div>
              <div className="channel4">
                <p>Data protection Access</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Footer
