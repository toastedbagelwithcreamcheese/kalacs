// lib/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function getGalleryImages(folderName) {
  try {
    const { resources } = await cloudinary.search
      .expression(`folder:${folderName}`)
      .sort_by('public_id', 'desc')
      .max_results(500) // Maximum 500 képet kér le
      .execute();

    // Alakítsuk át az adatokat a komponens számára
    const images = resources.map(resource => ({
      id: resource.public_id,
      publicId: resource.public_id,
      src: resource.secure_url,
      width: resource.width,
      height: resource.height,
    }));

    return images;
  } catch (error) {
    console.error("Cloudinary hiba:", error);
    return [];
  }
}