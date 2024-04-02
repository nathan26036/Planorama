import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'

import App from './App.jsx';
import HomePage from './pages/homePage.jsx';
import Planner from './pages/calendar.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/newUser.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />,
            },
            {
                path: '/homepage',
                element: <HomePage />
            },
            {
                path: '/calendar',
                element: <Planner />
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router = {router} />
);
