'use client'

import { useForm, SubmitHandler } from "react-hook-form";

type FormData = {
    profile: FileList;
};
const PropertyImageCard: React.FC = () => {

    const {
        register,
        handleSubmit,
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
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
        const uploadedImageData = await uploadResponse.json();
        const imageUrl = uploadedImageData.secure_url;
        console.log(imageUrl);
    };

    return (
        <form className="mt-60 mx-16" onSubmit={handleSubmit(onSubmit)}>
            <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
            >
                Upload file
            </label>
            <input
                {...register("profile")}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
            />
            <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
            >
                SVG, PNG, JPG or GIF (MAX. 800x400px).
            </p>

            <button
                type="submit"
                className="text-white bg-gradient-to-r from-blue via-blue to-orange-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue dark:focus:ring-blue font-medium rounded text-sm px-5 py-2.5 text-center mr-2 my-4"
            >
                Upload to Cloud
            </button>
        </form>
    );
}

export default PropertyImageCard;