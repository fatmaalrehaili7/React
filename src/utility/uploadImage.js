import axios from 'axios';

const uploadImage = async (file) => {
  const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/fatma-cloud/image/upload';
  const unsignedPreset = 'u5gjdi09'; 

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', unsignedPreset);
  formData.append('folder', 'product-images');
  
  try {
    const response = await axios.post(cloudinaryUrl, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.secure_url; 
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export default uploadImage;

