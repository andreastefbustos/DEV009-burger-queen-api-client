import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Login } from './components/login/login.tsx'
import { loginAction } from './components/login/action.tsx'
import { Error } from './components/Error.tsx'
import { Layout } from './components/Layout.tsx'
import { Dashboard } from './components/dashboard/Dashboard.tsx'
import { dashboardLoader, loaderUser, loaderProduct } from './components/dashboard/loader.tsx'
import { CreateFromUser } from './components/dashboard/users/CreateUser.tsx';
import { createUserAction, updateUserAction } from './components/dashboard/users/action.tsx'
import { UpdateUser } from './components/dashboard/users/UpdateUser.tsx'
import { CreateFromProduct } from './components/dashboard/products/CreateProduct.tsx'
import { createProductAction, updateProductAction } from './components/dashboard/products/action.tsx'
import { UpdateProduct } from './components/dashboard/products/UpdateProduct.tsx'
import { dashboardAction } from './components/dashboard/action.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    action: loginAction,
  },
  {
    path: '/error',
    element: <Error />,
  },
  {
    path: '/dashboard',
    element: <Layout/>,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
      },
      {
        path: 'users/create',
        element: <CreateFromUser />,
        action: createUserAction,
      },
      {
        path: 'users/:id/update',
        element: <UpdateUser />,
        loader: loaderUser,
        action: updateUserAction,
      },
      {
        path: 'products/create',
        element: <CreateFromProduct />,
        action: createProductAction,
      },
      {
        path: 'products/:id/update',
        element: <UpdateProduct />,
        loader: loaderProduct,
        action: updateProductAction,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider  router={router}/>
    </NextUIProvider>
  </React.StrictMode>,
)
