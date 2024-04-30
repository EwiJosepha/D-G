// export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
// export const CLOUDINARY_API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
// export const CLOUDINARY_API_SECRET = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;

export const API_BASE_URL = (process.env.NODE_ENV === 'development') ? process.env.NEXT_PUBLIC_API_BASE_URL : process.env.NEXT_PUBLIC_RENDER_API_URL