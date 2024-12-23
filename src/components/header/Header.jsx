import React from 'react'
import classes from './header.module.css'
import {jwtDecode} from 'jwt-decode'
function Header()
{
    const currentUrl = window.location.href;
    console.log(currentUrl)
    let url = currentUrl.split('/blog')
    let decodedToken
    let token = localStorage.getItem('token');
    if (token){
     decodedToken = jwtDecode(token);}

    return <>
    
    <nav>
        <a href="/" className={`${classes.name}`}>Yusef0x1.dev</a>

        {/* <div className={`${classes.links}`}>
            <a href="/blog">/blog</a>
            <a href="#">/projects</a>
            <a href="#">/chat</a>
        </div> */}

        {url[1] === '' && decodedToken?.username === 'admin' && token ? (
  <a href="blog/create" className={`${classes.create_post}`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
    <span>Create a new post</span>
  </a>
) : null}
        

    </nav>
    
    </>
}

export default Header;
