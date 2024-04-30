import React from 'react'
import Image from 'next/image'

function Luxury() {
  return (
    <div className="luxurySection flex items-center justify-center md:mx-auto md:w-3/4 lg:w-2/3 mb-20 md:mt-16">
      <div className="houseTextWrapper">
        <div className="w-[100%] md:ml-0 ml-[5%] hidden md:block">
          <Image width={200} height={200} id="imagedes" src='/banner.webp' alt="image" style={{ width: '90%', height: '500px', objectFit: 'cover' }} />
        </div>
        <div className=" w-full items-center justify-center flex flex-col md:items-start md:px-0 px-4">
          <h1 className='md:text-4xl md:pb-10 pb-4 text-2xl font-extrabold'>SPECIALIST IN THE LUXURY SEGMENT</h1>
          <span className='md:text-lg '>With recognized relevant experience in the development sector, the brand is increasingly identified as a specialist in this high-quality segment. The portfolio has more than 300 luxury developments, which allows developers, builders and other investors to choose the D&J Collection as the option when delivering their project.</span>
        </div>
      </div>
    </div>
  )
}

export default Luxury
