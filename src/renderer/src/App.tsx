import { Dashboard } from './components/Dashboard'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './styles/global.css'
import { Base } from './components/layout/base'
import { ProductList } from './pages/product/product-list'
import { CreateProduct } from './pages/product/create-product'

const router = createBrowserRouter([
  {
    element: <Base />,
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/settings',
        element: <h1>Settings Here</h1>,
      },
      {
        path: '/products',
        element: <ProductList />,
      },
      {
        path: '/products/create-product',
        element: <CreateProduct />,
      },
    ],
  },
])

export function App() {
  return <RouterProvider router={router} />
}
