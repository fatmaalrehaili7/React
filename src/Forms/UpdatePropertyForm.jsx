import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import uploadImage from '../Utility/uploadImage';
import { useNavigate } from 'react-router-dom';

const UpdatePropertyForm = ({ property, onUpdateProperty }) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState({
    title: '',
    location: '',
    price: '',
    imageUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate= useNavigate();

  // Check if property is defined and set state accordingly
  useEffect(() => {
    if (property) {
      setTitle(property.title);
      setLocation(property.location);
      setPrice(property.price);
      setImageUrl(property.imageUrl);
    }
  }, [property]);

  const validateForm = () => {
    const newErrors = { title: '', location: '', price: '', imageUrl: '' };
    let isValid = true;

    if (imageFile && imageFile.size === 0) {
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
        let uploadedImageUrl = property.imageUrl;

        
        if (imageFile) {
          uploadedImageUrl = await uploadImage(imageFile);
        }

        const updatedProperty = {
          id: property.id,
          title: title.trim() !== '' ? title : property.title, 
          location: location.trim() !== '' ? location : property.location, 
          price: price ? Number(price) : property.price,
          imageUrl: uploadedImageUrl,
        };
        navigate('/');
        console.log('Updating property:', updatedProperty); 
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
    } else {
      setImageFile(null); 
      setImageUrl(''); 
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
      />
      {errors.title && <span>{errors.title}</span>}

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      {errors.location && <span>{errors.location}</span>}

      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
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
    title: PropTypes.string,
    location: PropTypes.string,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
  }).isRequired,
  onUpdateProperty: PropTypes.func.isRequired,
};

export default UpdatePropertyForm;
