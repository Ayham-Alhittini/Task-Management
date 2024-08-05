import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import ProtectedRoute from './ProtectedRoute';
import DraggableTaskList from '../components/tasks/taskList/DraggableTaskList';
import ImportantTaskList from '../components/tasks/taskList/ImportantTaskList';
import UpcomingTaskList from '../components/tasks/taskList/UpcomingTaskList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/tasks/today' replace='true' />
  },
  {
    path: '/tasks',
    element: <ProtectedRoute element={Home} />,
    children: [
      {
        path: 'today',
        element: <DraggableTaskList isMyDay={true} />
      },
      {
        path: 'important',
        element: <ImportantTaskList />
      },
      {
        path: 'upcoming',
        element: <UpcomingTaskList />
      },
      {
        path: 'inbox',
        element: <DraggableTaskList />
      }
    ]
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
