import React from 'react';

import {useState, useEffect} from 'react';
import Post from '../post/Post'
import classes from './blog.module.css'
import Header from '../header/Header'
import { useLocation } from 'react-router-dom';

function Blog()
{
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('page') || 1;

   useEffect(() => {
    async function fetchPosts() {
        try {
            const response = await fetch(`http://localhost:4000/posts?page=${page}`);
            if (!response.ok)
            {
                throw new Error(`HTTP error: Status ${response.status}`);

            }

            let posts = await response.json();

            setData(posts);
            console.log(posts)
                setError(null);
        }
        catch(err)
        {
            setError(err.message);
            setData(null);
        }

        finally{
            setLoading(false);
        }
    }
    fetchPosts();
   },[])

   if (data) {
    
    if (data) {
        return (
            <>
            <Header/>
            <h1>My blogs</h1>

          <div className={`${classes.posts}`}>
            {data.map((post) => (
              <Post 
                key={post.id} 
                date={post.created_at} 
                title={post.title} 
                thumbnail="../src/assets/wall.png"
                description={post.title} 
                postId = {post.id}
              />
            ))}
          </div>
          </>
        );
      }
}

}

export default Blog;