import { useState } from 'react';
import { nanoid } from 'nanoid';

const AddPropertyForm = ({ onAddProperty }) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProperty = {
      id: nanoid(),
      title,
      location,
      price: Number(price),
      imageUrl,
    };
    onAddProperty(newProperty);
    setTitle('');
    setLocation('');
    setPrice('');
    setImageUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-property-form">
      <h2>Add New Product</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddPropertyForm;