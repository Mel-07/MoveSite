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
import Login from './pages/Login.tsx'

const router = createBrowserRouter([
  {
    index:true,
    element: <Login />,
  },
  {
    path: "/app",
    element: <App />,
    // errorElement:<ErrorPage/>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/app/top-rated",
        element: <TopRated />,
      },
      {
        path: "/app/bookmark",
        element: <BookMark />,
      },
      {
        path: "/app/title",
        element: <Title />,
      },
      {
        path: "/app/profile",
        element: <Profile />,
      },
      {
        path: "*",
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
