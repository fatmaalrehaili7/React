const Product = ({ property, onDelete, onEdit }) => {
  const { title, location, price, imageUrl } = property;

  return (
    <div className="property-card">
      <img src={imageUrl} alt={title} className="property-image" />
      <h2>{title}</h2>
      <p>{location}</p>
      <p>Price: ${price}</p>
      <button onClick={() => onDelete(property)}>Delete Probarty</button>
      <button onClick={() => onEdit(property)}>Edit Property</button> 
    </div>
  );
};

export default Product;






