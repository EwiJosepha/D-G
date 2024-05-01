'use client'

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { ComponentProps } from "./propertyOverviewCard";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";

type FormData = {
    profile: FileList;
};

type Prop = {
    images: String[]
}

//saveData, existinData are fn and keys called in the major fn rendering all the three com for property creation

const PropertyImageCard: React.FC<ComponentProps> = ({ saveData, existingData }) => {

    const [uploadedImages, setUploadedImages] = useState<string[]>([])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data, event) => {
        try {
            const image = data.profile[0];
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "real-estate-preset");

            const uploadResponse = await fetch(
                "https://api.cloudinary.com/v1_1/beri-cloud/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!uploadResponse.ok) {
                throw new Error("Failed to upload image");
            }

            const uploadedImageData = await uploadResponse.json();
            const imageUrl = uploadedImageData.secure_url;
            setUploadedImages((prevImages) => [...prevImages, imageUrl]);
            event?.target.reset(); // Reset the form after successful upload
        } catch (error) {
            console.error("Error uploading image:", error);
            // Handle the error, e.g., display an error message to the user
        }
    };

    const submitUrl = async () => {
        try {
            await saveData("PropertyImageCard", uploadedImages);
        } catch (error) {
            console.error("Error saving image URLs:", error);
        }
    };

    const handleDeleteImage = (index: number) => {
        setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };


    return (
        <form className="mt-4 p-4 shadow shadow-blue rounded-lg" onSubmit={handleSubmit(onSubmit)}>
            <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
            >
                Upload file
            </label>
            <input
                {...register("profile", { required: "Upload at least 4 images" })}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
                multiple
            />
            <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
            >
                SVG, PNG, JPG or GIF (MAX. 800x400px).
            </p>

            {errors.profile && (
                <p className="text-red-500 text-sm mt-2">{errors.profile.message}</p>
            )}

            <button
                type="submit"
                onClick={submitUrl}
                className="text-white bg-gradient-to-r from-blue via-blue to-orange-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue dark:focus:ring-blue font-medium rounded text-sm px-5 py-2.5 text-center mr-2 my-4"
            >
                Upload to Cloud
            </button>

            <div className="grid md:grid-cols-8 gap-4">
                {uploadedImages?.map((imageUrl, index) => (
                    <div key={index} className="relative w-32 h-32 ">
                        <Image
                            src={imageUrl}
                            alt={`Uploaded Image ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            className="rounded"
                        />
                        <button
                            className="absolute top-1 right-2 p-1 bg-red-500 rounded-full text-white"
                            onClick={() => handleDeleteImage(index)}
                        >
                            <FaTimes />
                        </button>
                    </div>
                ))}
            </div>
        </form>
    );
}

export default PropertyImageCard;