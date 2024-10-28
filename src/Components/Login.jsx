import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      id: Date.now().toString(),
      name: 'Fatma',
      email: 'fatma@gmail.com',
      password: '123456',
      address: 'Riyadh, Saudi Arabia',
    };

    if (user.email === userData.email && user.password === userData.password) {
      alert('successfully signed in');
      localStorage.setItem("isSignedIn", "true");
      navigate('/', { state: userData });
    } else {
      alert("The Email or Password is not correct");
      navigate('/Login');
    }
  };

  return (
    <div className="Login-card">
      <h2>User Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;

