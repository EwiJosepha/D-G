import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function FooterLogo() {
  return (
    <div>
      <Link href="/" passHref className="forlogo items-center justify-center ">
        <div className="flex items-center">
          <div className="line1"></div>
          <p id="footertext">THE</p>
          <div className="line2"></div>
        </div>

        <div className="flex items-center flex-col justify-center">

          <div className="flex text-white items-center justify-center">
            <div className="imgr">
            <Image src='/assets/images/realestate-listing/4373182_earth_logo_logos_icon.png' alt='Logo' width={45} height={50} />

            </div>

            <div>
              <h2 className='font-extrabold font-serif text-xl'>D&J</h2>
              <p id="collection">COLLECTION</p>
            </div>
          </div>

          <div className="line3"></div>

        </div>
      </Link>
    </div>
  )
}

export default FooterLogo


