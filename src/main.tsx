import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Login, LoginAction } from './components/login/login.tsx'
import { Dashboard } from './components/dashboard/dashbord.tsx'
import { dashboardLoader } from './components/dashboard/loader.tsx'

const router = createBrowserRouter([
  {
    path: 'login',
    element: <Login />,
    action: LoginAction,
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
    loader: dashboardLoader,
  },
  {},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider  router={router}/>
    </NextUIProvider>
  </React.StrictMode>,
)
