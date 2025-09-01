
import ReactDOM from 'react-dom/client';
import {  Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import Login from './Pages/Login/Login';
import EventForm from './Component/Event/EventForm';
import AdminManagement from './Component/Admin/AdminAdd';
import Auth from './utils/Auth.js';
import Announcement from './Component/Announcement/Annoncement.js';
import Gallery from './Component/Gallery/Gallery.js';

const router = createBrowserRouter([
    {
    path: '/admin/',
    element: <Login />,
  },
  {
    path: '/admin/dashboard',
    element:<Auth component={ <App />}/>,
      children: [
         {
        index: true, 
        element: <Navigate to="/admin/dashboard/event" />
      },
        { path: 'event', element: <EventForm /> },
        { path: 'announcement', element: <Announcement /> },
        { path: 'gallery', element: <Gallery /> },
        { path: 'admin', element: <AdminManagement /> },
        { path: '*', element: <Navigate to="/admin" /> }
      ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
