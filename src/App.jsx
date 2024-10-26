import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import './index.css';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Products from './Components/Products';
import { Properties } from '../data'; 
import AddPropertyForm from './Forms/AddPropertyForm';
import UpdatePropertyForm from './Forms/UpdatePropertyForm';
import Login from './Components/Login';


const UpdatePropertyWrapper = ({ onUpdateProperty }) => {
  const location = useLocation();

  return (
    <>
      <Header />
      <UpdatePropertyForm
        property={location.state?.property} 
        onUpdateProperty={onUpdateProperty}
      />
      <Footer />
    </>
  );
};

const App = () => {
  const [properties, setProperties] = useState(Properties);
  const [editingProperty, setEditingProperty] = useState(null);

  const handleAddProperty = (newProperty) => {
    setProperties((prevProperties) => [...prevProperties, newProperty]);
  };

  const handleDeleteProperty = (propertyToDelete) => {
    setProperties((prevProperties) =>
      prevProperties.filter((property) => property.id !== propertyToDelete.id)
    );
  };

  const handleEditProperty = (propertyToEdit) => {
    setEditingProperty(propertyToEdit);
  };

  const handleUpdateProperty = (id, updatedProperty) => {
    setProperties((prevProperties) =>
      prevProperties.map((property) => (property.id === id ? updatedProperty : property))
    );
    setEditingProperty(null); 
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Header />
          <Products properties={properties} onDelete={handleDeleteProperty} onEdit={handleEditProperty} />
          <Footer />
        </>
      ),
    },
    {
      path: '/add-property',
      element: (
        <>
          <Header />
          <AddPropertyForm onAddProperty={handleAddProperty} />
          <Footer />
        </>
      ),
    },
    {
      path: '/update-property',
      element: <UpdatePropertyWrapper onUpdateProperty={handleUpdateProperty} />, // Use the wrapper here
    },
    {
      path: '/login',
      element: (
        <>
          <Header />
          <Login />
          <Footer />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;


