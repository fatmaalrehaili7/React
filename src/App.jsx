import { useState } from 'react';

import './index.css';
import Header from './Layout/header';
import Footer from './Layout/footer';
import Products from './Components/Products';
import { Properties } from '../data'; 
import AddPropertyForm from './Forms/AddPropertyForm';
import UpdatePropertyForm from './Forms/UpdatePropertyForm';


const App = () => {
  const [properties, setProperties] = useState(Properties);
  const [editingProperty, setEditingProperty] = useState(null);

  const addProperty = (newProperty) => {
    setProperties((prevProperties) => [...prevProperties, newProperty]);  
  };

  const deleteProperty = (propertyToDelete) => {
    setProperties((prevProperties) =>
      prevProperties.filter((property) => property.id !== propertyToDelete.id)  
    );
  };

  const updateProperty = (propertyId, updatedProperty) => {
    setProperties((prevProperties) =>
      prevProperties.map((property) =>
        property.id === propertyId ? updatedProperty : property
      )
    );
    setEditingProperty(null);
  }
  return (
    <div className="app">
      <Header />
      <h1>Proparty Listings</h1>
      <AddPropertyForm onAddProperty={addProperty} />
  
      {editingProperty ? (
        <UpdatePropertyForm 
          property={editingProperty} 
          onUpdateProperty={updateProperty} 
        />
      ) : (
        <Products 
          properties={properties} 
          onDelete={deleteProperty} 
          onEdit={setEditingProperty} 
        />
      )}
      <Footer />
    </div>
  );

};


export default App;
