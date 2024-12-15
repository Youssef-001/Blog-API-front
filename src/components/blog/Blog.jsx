import React from 'react';

import {useState, useEffect} from 'react';


function Blog()
{

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   useEffect(() => {
    async function fetchPosts() {
        try {
            const response = await fetch('http://localhost:4000/posts');
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

}

export default Blog;