import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import './index.css';
import Header from './Layout/header';
import Footer from './Layout/footer';
import Products from './Components/Products';
import { Properties } from '../data'; 
import AddPropertyForm from './Forms/AddPropertyForm';
import UpdatePropertyForm from './Forms/UpdatePropertyForm';
import Login from './Components/Login';
import ProtectedRoute from './Route/ProtectedRoute';


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
// Wrapper component to use location within the router context
const UpdatePropertyWrapper = ({ onUpdateProperty }) => {
  const location = useLocation(); 
  return (
    <>
     
      <UpdatePropertyForm
        property={location.state?.property} 
        onUpdateProperty={onUpdateProperty}
      />
    </>
  );
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
      path: '/login',
      element: (
        <>
          <Header />
          <Login />
          <Footer />
        </>
      ),
    },
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
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
          element: (
            <>
             <Header />
              <UpdatePropertyWrapper onUpdateProperty={handleUpdateProperty} />
               <Footer />
            </>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
export default App;




