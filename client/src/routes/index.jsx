import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import Test from '../components/Test';

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
        path: 'signin',
        element: <SignIn />
      },
      {
        path: 'signup',
        element: <SignUp />
      }
    ]
  },
  {
    path: '/test',
    element: <Test />
  }
]);

export default router;
