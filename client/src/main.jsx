import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'normalize.css'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import { ErrorPage, Register, Landing, ProtectedRoute } from '../src/pages'
import { AppProvider } from './context/AppContext';
import { AddJob, AllJobs, Profile, SharedLayOut, Stats } from './pages/dashboard';
import { ThemeContextProvider } from './context/ThemeContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute>
      <SharedLayOut />
    </ProtectedRoute>,
    children: [
      {
        index: true,
        element: <Stats />
      },
      {
        path: 'all-jobs',
        element: <AllJobs />
      },
      {
        path: 'add-job',
        element: <AddJob />
      },
      {
        path: 'profile',
        element: <Profile /> 
      }
    ]
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider>
    <AppProvider>
    <RouterProvider router={router} />
    </AppProvider>
    </ThemeContextProvider>
  </StrictMode>,
)
