
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout'
import Error from './pages/Error'
import ViewEmployees from './pages/ViewEmployees'
import CreateEmployee from './pages/CreateEmployee'

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <CreateEmployee />,
        errorElement: <Error />
      },
      {
        path: 'view',
        element: <ViewEmployees />,
        errorElement: <Error />
      },
      {
        path: '*',
        element: <Error />
      }
    ]
  }
])
function App() {
  return (
    <>
      <RouterProvider router={router} /> 
    </>
  )
}

export default App
