import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/tasks/today' replace='true' />
  },
  {
    path: '/tasks/:category',
    element: <ProtectedRoute element={Home} />
  },
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        path: 'signin',
        element: <SignIn />
      },
      {
        path: 'signup',
        element: <SignUp />
      }
    ]
  }
]);

export default router;
