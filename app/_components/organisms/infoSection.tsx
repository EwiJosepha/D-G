import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Luxury from './luxury';

function InfoSection() {
  return (
    <div className="md:pt-28 bg-blue text-white">
      <div className="md:flex items-center justify-center md:mx-auto md:w-3/4 lg:w-2/3">
        <div className="innerDiv text-base md:w-[80%] md:mr-20 w-screen md:p-0 p-5">
          <div className='w-full items-center justify-center flex flex-col md:items-start'>
            <div id="line"></div>
            <h1 className='font-serif font-extrabold md:text-4xl text-2xl'>D&J COLLECTIONS</h1>
            <p id="descriptionInfo" className='font-serif w-5/6 '>Since its creation in 2020, D&J Collection Cameroon has consistently maintained its position as the number one specialist real estate company in the luxury segment in Cameroon. With an impressive portfolio of around 1,000 properties and a team of 1,000 certified real estate consultants, it has established itself as an industry leader in the luxury real estate segment. Its unwavering dedication to providing a superior level of service and personalized care sets it apart from its competitors.</p>
          </div>
          <div className="agenciesDescription">
            <div className="agencies">
              <strong className="numberFont">12</strong>
              <span>Agencies</span>
            </div>
            <div className="agents">
              <strong className="numberFont">+20</strong>
              <span>Real Estate Agents</span>
            </div>
            <div className="sales subdiv">
              <strong className="numberFont">+$1,5B</strong>
              <span>Annual Sales</span>
            </div>
            <div className="luxury">
              <strong className="numberFont">180</strong>
              <span>Number of luxury <br />properties sold in 2023</span>
            </div>
          </div>
        </div>

        <div className="w-[90%] md:ml-0 ml-[5%]">
          <Image width={100} height={200} id="imagedes" src='/banner2.webp' alt="image" layout='responsive' />
        </div>

      </div>
      <Luxury />
    </div>
  );
}

export default InfoSection;