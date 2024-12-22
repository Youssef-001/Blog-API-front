import React from 'react';
import {useState} from 'react'
import Comment from './Comment.jsx'
import {useParams} from 'react-router-dom'
import classes from './comments.module.css'
function Comments({comments, setComments})
{

    let [comment, setComment] = useState('');
    let [name, setName] = useState('Anonymous')

    const { id } = useParams();

   async function handleCommentSubmit(e)
    {
        e.preventDefault();


        let now = new Date();
        let res = await fetch(`http://localhost:4001/comments/${id}`,  {credentials:'include', method: 'POST',headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({name: name, content: comment})});

        let newComment = await res.json();
        if (newComment){
        setComments([...comments,newComment])}
        console.log(newComment); 
        
        
    }

    return (
        <>
        
        <h2>Comments ({comments.length})</h2>

        <form  onSubmit={handleCommentSubmit}>
            <input onChange={(e) => {setName(e.target.value)}} name="name" type="text" placeholder='your name'/>
            <textarea rows="12" colr="20" onChange={(e) => {setComment(e.target.value)}} name="comment" id="comment">Add a comment</textarea>

            <button onClick={handleCommentSubmit} type="submit">Post comment</button>
        </form>

        <div className={`${classes.comments_div}`}>
                {comments.map((comment, index) => (
                    <Comment 
                        key={index} 
                        content={comment.content} 
                        author={comment.authorName} 
                        date={comment.created_at} 
                        comment_id = {comment.id}
                        setComments={setComments}
                        comments={comments}
                    />
                ))}
            </div>
        
        </>
    )
    

}

export default Comments;