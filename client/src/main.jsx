import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import Auth from './pages/Auth';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Test from './components/Test';

const router = createBrowserRouter([

  {
    path: '/',
    element: <Navigate to='/tasks/today' replace='true' />
  },
  {
    path: '/tasks/:category',
    element: <Home />
  },
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        path: '/auth/signin',
        element: <SignIn />
      },
      {
        path: '/auth/signup',
        element: <SignUp />
      }
    ]
  },
  {
    path: '/test',
    element: <Test />
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
