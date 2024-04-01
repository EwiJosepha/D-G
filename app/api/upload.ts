import { cloudinary } from "@/cloudinary.config";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const uploader = cloudinary.uploader;
        const { files } = req.body;

        const uploadPromises = files.map((file: string) =>
            uploader.upload(file, {
                folder: 'real-estate',
                transformation: [
                    { width: 300, height: 200, crop: 'fit' },
                ],
            })
        );

        const results = await Promise.all(uploadPromises);
        const imageUrls = results.map((result) => result.secure_url);

        res.status(200).json({ imageUrls });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Image upload failed' });
    }
}