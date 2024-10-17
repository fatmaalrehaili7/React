import './index.css';
import Products from './Components/Products';
import { Properties } from '../data'; 
import { useState } from 'react';
// import AddPropertyForm from './Components/AddPropertyForm';  

const App = () => {
  const [properties, setProperties] = useState(Properties);



  const deleteProperty = (propertyToDelete) => {
    setProperties((prevProperties) =>
      prevProperties.filter((property) => property.id !== propertyToDelete.id)  
    );
  };

  return (
    <div className="app">
      <h1>Product Listings</h1>
      
      <Products properties={properties} onDelete={deleteProperty} /> 
    </div>
  );
};

export default App;
