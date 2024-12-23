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
            const response = await fetch(`http://localhost:4001/posts?page=${page}`,{credentials:'include'});
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
            <h1 className={`${classes.blogs}`}>My blogs</h1>

            <main>

          <div className={`${classes.posts}`}>
            {data.map((post)  => { let cover = `http://localhost:4001/${post.cover}`;return(
              <Post 
                key={post.id} 
                date={post.created_at} 
                title={post.title} 
                thumbnail={cover}
                description={post.title} 
                postId = {post.id}
              />
            )})}
          </div>
            </main>
          </>
        );
      }
}

}

export default Blog;