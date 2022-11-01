import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Register from './pages/Register';
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from './pages/Home';

function App() {

 

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/register',
      element: <Register />
    }

  ])

  return (
    <div className="App">
      <Header/>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
