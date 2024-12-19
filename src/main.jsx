import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Blog from './components/blog/Blog.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostPage from './components/postPage/PostPage.jsx'
import CreatePost from './components/CreatePost/CreatePost.jsx'
import Login from './components/login/Login.jsx'
import PrivateRouter from './components/PrivateRouter.jsx'
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
},

{
  path: "blog/create",
  element: <PrivateRouter><CreatePost/></PrivateRouter>
},

{
  path: "blog/edit/:id",
  element: <PrivateRouter><CreatePost/></PrivateRouter>
}
,

{
  path: "blog/login",
  element: <Login></Login>
}
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
