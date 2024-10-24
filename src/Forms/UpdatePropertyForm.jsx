import { useState } from 'react';

import PropTypes from 'prop-types';
import uploadImage from '../Utility/uploadImage';

const UpdatePropertyForm = ({ property, onUpdateProperty }) => {
  const [title, setTitle] = useState(property.title);
  const [location, setLocation] = useState(property.location);
  const [price, setPrice] = useState(property.price);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(property.imageUrl);
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

    if (!imageFile && !imageUrl) {
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
        let uploadedImageUrl = imageUrl;
        if (imageFile) {
          uploadedImageUrl = await uploadImage(imageFile);
        }

        const updatedProperty = {
          ...property,
          title,
          location,
          price: Number(price),
          imageUrl: uploadedImageUrl,
        };

        onUpdateProperty(property.id, updatedProperty);

      } catch (error) {
        console.error('Error during image upload', error);
      } finally {
        setLoading(false);
      }
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
    <form onSubmit={handleSubmit} className="update-property-form">
      <h2>Update Property</h2>

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
      />
      {errors.imageUrl && <span>{errors.imageUrl}</span>}

      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Selected Preview" width="200" />
        </div>
      )}

      <button type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Update Property'}
      </button>
    </form>
  );
};

UpdatePropertyForm.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
  onUpdateProperty: PropTypes.func.isRequired,
};

export default UpdatePropertyForm;
