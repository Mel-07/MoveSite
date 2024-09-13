import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import Home from './pages/Home.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import TopRated from './pages/TopRated.tsx'
import BookMark from './pages/BookMark.tsx'
import Title from './pages/Title.tsx'
import Profile from './pages/Profile.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement:<ErrorPage/>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path:'/top-rated',
        element:<TopRated/>
      },
      {
        path:'/bookmark',
        element:<BookMark/>
      },
      {
        path:'/title',
        element:<Title/>
      },
      {
        path:'/profile',
        element:<Profile/>
      },
      {
        path:'*',
        errorElement:<ErrorPage/>
      }
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
