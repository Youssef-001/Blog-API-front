import { useParams } from "react-router-dom";
import classes from './postpage.module.css'
import {useState, useEffect} from 'react'
import Header from '../header/Header'
import ContentComponent from '../ContentComponent'
 function PostPage()
{
    const { id } = useParams();
    const [post, setPost] = useState(null);

        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);


    useEffect(() => {

        async function getPost()
        {
            try{
                let res = await fetch(`http://localhost:4000/posts/${id}`);
       
                if (!res.ok)
                   {
                       throw new Error(`HTTP error: Status ${response.status}`);
       
                   }
                   let fetchedPost = await res.json();
                   setPost(fetchedPost);
                   setError(null);
               }
               catch(err)
               {
                   setError(err.message);
                   setPost(null);
               }
       
               finally{
                   setLoading(false);
               }
        }

        getPost();
        



        
    },[]
)

if (post){
return (
    <>
    <Header/>
<main>

    <time dateTime={[post.created_at]}>{post.created_at}</time>

    <h1>{post.title}</h1>

    <ContentComponent description={post.content}/>
</main>

    </>
)}


}

export default PostPage