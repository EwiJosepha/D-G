'use client'

import { useState } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import axios from 'axios';

const PropertyImageCard: React.FC = () => {

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        setSelectedFiles(files);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        selectedFiles.forEach((file) => formData.append('files', file));

        try {
            const response = await axios.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 200) {
                const { imageUrls } = response.data;
                console.log(imageUrls);
                setUploadedImages(imageUrls);
            } else {
                console.error('Image upload failed');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-4 shadow shadow-blue rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Photo Upload</h3>
            <div>
                <input type="file" multiple onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div>
            <div>
                <h2>Uploaded Images</h2>
                <div className="grid grid-cols-3 gap-4">
                    {uploadedImages.map((imageUrl) => (
                        <div key={imageUrl}>
                            <Image cloudName={process.env.CLOUDINARY_CLOUD_NAME} publicId={imageUrl}>
                                <Transformation width="300" height="200" crop="fit" />
                            </Image>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
//     const [mainImage, setMainImage] = useState<string>('');
//     const [additionalImages, setAdditionalImages] = useState<string[]>([]);

//     const handleMainImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (file) {
//             const formData = new FormData();
//             formData.append('file', file);
//             formData.append('upload_preset', 'real-estate-preset');

//             try {
//                 const response = await fetch(
//                     `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
//                     {
//                         method: 'POST',
//                         body: formData,
//                     }
//                 );

//                 // if (response.ok) {
//                 //     const data = await response.json();
//                 //     setMainImage(data.secure_url);

//                 //     // Save the URL to your backend
//                 //     await axios.post('/api/saveImage', { url: data.secure_url });
//                 // } else {
//                 //     // Handle error case if needed
//                 // }
//             } catch (error) {
//                 // Handle error case if needed
//             }
//         }
//     };

//     const handleAdditionalImagesUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//         const files = Array.from(event.target.files || []);
//         const uploadPromises = files.map(async (file) => {
//             const formData = new FormData();
//             formData.append('file', file);
//             formData.append('upload_preset', 'real-estate-preset');

//             try {
//                 const response = await fetch(
//                     `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
//                     {
//                         method: 'POST',
//                         body: formData,
//                     }
//                 );

//                 if (response.ok) {
//                     const data = await response.json();
//                     return data.secure_url;
//                 } else {
//                     // Handle error case if needed
//                 }
//             } catch (error) {
//                 // Handle error case if needed
//             }
//         });

//         // try {
//         //     const imageUrls = await Promise.all(uploadPromises);
//         //     setAdditionalImages(imageUrls.filter((url) => url !== undefined));

//         //     // Save the URLs to your backend
//         //     await axios.post('/api/saveImages', { urls: imageUrls });
//         // } catch (error) {
//         //     // Handle error case if needed
//         // }
//     };

//     return (
//         <div className="p-4 shadow shadow-blue rounded-lg">
//             <h3 className="text-xl font-semibold mb-4">Photo Upload</h3>

//             <div className="mb-4">
//                 <div>
//                     <label htmlFor="mainImage" className="block">
//                         Main Image*
//                     </label>
//                     <input
//                         type="file"
//                         id="mainImage"
//                         className="w-full"
//                         onChange={handleMainImageUpload}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="additionalImages" className="block">
//                         Images*
//                     </label>
//                     <input
//                         type="file"
//                         id="additionalImages"
//                         className="w-full grid-cols-4"
//                         multiple
//                         onChange={handleAdditionalImagesUpload}
//                     />
//                 </div>
//             </div>

//             <div className="mt-6">
//                 <h3 className="text-xl font-semibold mb-4">Uploaded Images</h3>
//                 {/* Main image */}
//                 {mainImage && (
//                     <div>
//                         <img src={mainImage} alt="Main Image" className="w-40 h-40" />
//                     </div>
//                 )}

//                 {/* Additional images */}
//                 <div className="grid grid-cols-3 gap-4">
//                     {additionalImages.map((imageUrl) => (
//                         <div key={imageUrl}>
//                             <img src={imageUrl} alt="Additional Image" className="w-40 h-40" />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

export default PropertyImageCard;