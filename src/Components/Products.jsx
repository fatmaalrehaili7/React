import Product from './Product';

const Products = ({ properties, onDelete }) => {
  if (properties.length === 0) {
    return <p>No property available at the moment.</p>;
  }

  return (
    <div className="property-list">
      {properties.map((property) => (
        <Product key={property.id} property={property} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default Products;

