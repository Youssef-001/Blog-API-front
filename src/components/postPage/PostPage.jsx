import { useParams, useNavigate } from "react-router-dom";
import classes from './postpage.module.css'
import {useState, useEffect} from 'react'
import Header from '../header/Header'
import ContentComponent from '../ContentComponent'
import { jwtDecode } from "jwt-decode";
import { Link } from 'react-router-dom';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; // Import the Atom One Dark theme
import Comments from '../comments/Comments'
 function PostPage()
{
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    

    useEffect(() => {
        if (post) {
          const codeBlocks = document.querySelectorAll('pre code');
      
          codeBlocks.forEach((block) => {
            // Assign the class dynamically if not already present
            if (!block.classList.contains('hljs')) {
              block.classList.add('hljs', 'language-javascript');
            }
            hljs.highlightElement(block); // Apply highlighting to the specific block
          });
        }
      }, [post]);
      
      

    const [control,setControl] = useState(false);

    let token = localStorage.getItem('token');
    let decodedToken;
    console.group(token);
    if (token )
     decodedToken = jwtDecode(token);






        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);


    useEffect(() => {

        async function getPost()
        {
            try{
                let res = await fetch(`http://localhost:4001/posts/${id}`, {credentials:'include'});
       
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

        async function getComments()
        {
            try {
                let res = await fetch(`http://localhost:4001/comments/${id}`, {credentails:'include'});

                if (!res.ok)
                    {
                        throw new Error(`HTTP error: Status ${response.status}`);
        
                    }

                let fetchedComments = await res.json();
                setComments(fetchedComments);

            }
            catch(err)
            {
                console.error(err);
            }
        }

        getPost();
        getComments();
        

        
    },[]
)


async function handleDelete() {
    try {
        const res = await fetch(`http://localhost:4001/posts/${id}`, {
            method: 'DELETE',
            credentials:'include',
            headers: { "Authorization": `Bearer ${token}` }

        });

        // Check if the response was successful
        if (res.ok) {
            console.log('Post deleted successfully');
            navigate('/blog'); // Navigate to blog page
        } else {
            console.error('Failed to delete the post');
            // Optionally handle the error (e.g., show a message to the user)
        }
    } catch (error) {
        console.error('Error during deletion:', error);
        // Handle any network or unexpected errors here
    }
}



if (post){
return (
    <>
    <Header/>
<main>

    { token && decodedToken.username == 'admin' ? <div className={`${classes.controls}`}>


<div className={`${classes.div_controls}`}>
<button onClick={(e) => {setControl(!control)}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

</button>
    


{control ? (
                    <div className={`${classes.control_items}`}>
                        <Link to={"/blog/edit/" + id} state={{oldContent: post.content, oldTitle:post.title, oldCover:post.cover}} >Edit</Link>
                        <Link onClick={(e)=>{handleDelete(e)}}>Delete</Link>
                    </div>
                ) : null}


</div>


    </div> : false}

    <time dateTime={[post.created_at]}>{post.created_at}</time>

    <h1 className={`${classes.title}`}>{post.title}</h1>

                
<article>
    <ContentComponent description={post.content}/>
    
    <section>

<div className={`${classes.comments}`}>

<Comments setComments={setComments} comments={comments}/>


</div>
</section>
</article>


</main>



    </>
)}


}

export default PostPage