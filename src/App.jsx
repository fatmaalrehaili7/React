import { useState } from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './index.css';
import Header from './Layout/header';
import Footer from './Layout/footer';
import Products from './Components/Products';
import { Properties } from '../data'; 
import AddPropertyForm from './Forms/AddPropertyForm';
import UpdatePropertyForm from './Forms/UpdatePropertyForm';
import Login from './Components/Login';


const App = () => {
  const [properties, setProperties] = useState(Properties);
  const [editingProperty, setEditingProperty] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
  };
  const handleLogin = (credentials) => {
    if (credentials.username === 'admin' && credentials.password === 'password') {
      setIsAuthenticated(true);
    }
  };
   const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <div className="app">
      <Header />
      
        <Routes>
         
          <Route 
            path="/login" 
            element={<Login onLogin={handleLogin} />} 
          />

          <Route
            path="/properties"
            element={
              <ProtectedRoute>
                <Products
                  properties={properties}
                  onDelete={deleteProperty}
                  onEdit={setEditingProperty}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-property"
            element={
              <ProtectedRoute>
                <AddPropertyForm onAddProperty={addProperty} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-property/:id"
            element={
              editingProperty && (
                <ProtectedRoute>
                  <UpdatePropertyForm
                    property={editingProperty}
                    onUpdateProperty={updateProperty}
                  />
                </ProtectedRoute>
              )
            }
          />

       
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      <Footer />
    </div>
  );

};


export default App;
