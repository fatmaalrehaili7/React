import { useState } from 'react';
import { nanoid } from 'nanoid';
import uploadImage from '../utility/uploadImage';


const AddPropertyForm = ({ onAddProperty }) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState({
    title: '',
    location: '',
    price: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false); 

  const validateForm = () => {
    const newErrors = { title: '', location: '', price: '', imageUrl: '' };
    let isValid = true;

    if (title.trim() === '' || title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters.';
      isValid = false;
    }

    if (location.trim() === '' || location.length < 3) {
      newErrors.location = 'Location must be at least 3 characters.';
      isValid = false;
    }

    if (price === '' || isNaN(price) || Number(price) <= 0) {
      newErrors.price = 'Price must be a positive number.';
      isValid = false;
    }

    if (!imageFile) {
      newErrors.imageUrl = 'Image is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        const uploadedImageUrl = await uploadImage(imageFile);
        setImageUrl(uploadedImageUrl);
        

        const newProperty = {
          id: nanoid(),
          title,
          location,
          price: Number(price),
          imageUrl: uploadedImageUrl, 
        };

        onAddProperty(newProperty);

        setTitle('');
        setLocation('');
        setPrice('');
        setImageFile(null);
        setImageUrl('');
      } catch (error) {
        console.error('Error during image upload', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log(errors);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file)); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-property-form">
      <h2>Add New Property</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      {errors.title && <span>{errors.title}</span>}

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      {errors.location && <span>{errors.location}</span>}

      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      {errors.price && <span>{errors.price}</span>}

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
      />
      {errors.imageUrl && <span>{errors.imageUrl}</span>}

      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Selected Preview" width="200" />
        </div>
      )}

      <button type="submit" disabled={loading}>
        {loading ? 'Uploading...' : 'Add Property'}
      </button>
    </form>
  );
};

export default AddPropertyForm;

