import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Blog from './components/blog/Blog.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostPage from './components/postPage/PostPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "blog",
    element: <Blog />,
  },
{
  path: "blog/:id",
  element: <PostPage />
}
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
