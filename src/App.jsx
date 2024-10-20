import './index.css';
import Header from './Components/header';
import Footer from './Components/footer';
import Products from './Components/Products';
import { Properties } from '../data'; 
import { useState } from 'react';
import AddPropertyForm from './Components/AddPropertyForm';  

const App = () => {
  const [properties, setProperties] = useState(Properties);

  const addProperty = (newProperty) => {
    setProperties((prevProperties) => [...prevProperties, newProperty]);  
  };

  const deleteProperty = (propertyToDelete) => {
    setProperties((prevProperties) =>
      prevProperties.filter((property) => property.id !== propertyToDelete.id)  
    );
  };

  return (
    <div className="app">
      <Header />
      <h1>Product Listings</h1>
      <AddPropertyForm onAddProperty={addProperty} />
      <Products properties={properties} onDelete={deleteProperty} />
      <Footer />
    </div>
  );

};

export default App;
