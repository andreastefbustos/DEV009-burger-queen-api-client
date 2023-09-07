import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Login, LoginAction } from './components/login/Login.tsx'
import { Dashboard } from './components/dashboard/Dashboard.tsx'
import { dashboardLoader } from './components/dashboard/loader.tsx'
import { RegisterUser } from './components/dashboard/RegisterUser.tsx';
import { Error } from './components/Error.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    action: LoginAction,
  },
  {
    path: '/error',
    element: <Error />,
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
    loader: dashboardLoader,
  },
  {
    path: 'register',
    element: <RegisterUser />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider  router={router}/>
    </NextUIProvider>
  </React.StrictMode>,
)
