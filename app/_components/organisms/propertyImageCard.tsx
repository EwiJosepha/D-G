'use client'

import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary'

const PropertyImageCard: React.FC = () => {



    return (
        <div className="p-4 shadow shadow-blue rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Photo Upload</h3>

            <CldUploadWidget signatureEndpoint="api/sign-image">
                {({ open }) => {
                    return (
                        <button className='bg-blue px-4 py-2 text-white rounded' onClick={() => open()}>
                            Upload an Image
                        </button>
                    );
                }}
            </CldUploadWidget>

        </div>
    );
};

export default PropertyImageCard;