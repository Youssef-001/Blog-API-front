import classes from './comment.module.css'
import avatar1 from '/home/yusef0x1/Programming/Odin/blog-API-front/src/assets/avatar.jpeg';
import avatar2 from '/home/yusef0x1/Programming/Odin/blog-API-front/src/assets/avatar2.jpeg';
import avatar3 from '/home/yusef0x1/Programming/Odin/blog-API-front/src/assets/avatar3.jpeg';
import avatar4 from '/home/yusef0x1/Programming/Odin/blog-API-front/src/assets/avatar4.jpeg';
import { useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
const randomNumber = Math.floor(Math.random() * 4) + 1;



function Comment({content, author, date, comment_id, comments,setComments,commentAuthor})
{
    const token = localStorage.getItem("token");
    let decodedToken;
    if (token)
        decodedToken = jwtDecode(token);

    console.log(decodedToken)



    const { id } = useParams();
    const userId = Cookies.get('userId');
    console.log(userId)
    console.log(commentAuthor)
        async function handleDeleteComment(e)
    {
        e.preventDefault();
        let res = await fetch(`http://localhost:4001/comments/${id}/${comment_id}`, {credentials: 'include', method: 'DELETE'})
        let comment = await res.json();
        setComments(comments.filter((comment) => comment.id !== comment_id))
        

        
    }



    return (
        <div className={`${classes.comment}`}>

            <img src={avatar1} alt="" className={`${classes.avatar}`} />
            <div >
                <div className={`${classes.comment_info}`}>
                <h2>{author}</h2>
                <time datetime={date}>{date}</time>

                </div>

                <p>{content}</p>
            </div>
        {commentAuthor === userId  || (token && decodedToken.username=='admin')? 
                <a href={"http://localhost:4001/comments/" + comment_id} onClick={handleDeleteComment}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
        
                </a> : null
    
    }




        </div>
    )
}

export default Comment;