import { useState } from 'react';

import Product from './Product';
import UpdatePropertyForm from '../Forms/UpdatePropertyForm';

const Products = ({ properties, onDelete, onEdit}) => {
  const [editingPropertyId, setEditingPropertyId] = useState(null); 
  if (properties.length === 0) {
    return <p>No property available at the moment.</p>;
  }

  return (
    <div className="property-list">
      {properties.map((property) => (
        <Product key={property.id} property={property} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default Products;

