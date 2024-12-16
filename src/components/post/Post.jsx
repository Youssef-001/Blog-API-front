import React from 'react'
import {useState} from 'react'
import classes from './post.module.css'

function Post({date, thumbnail, title, description, postId})
{

    return (<div className={`${classes.post}`}>


        <a href={"/blog/"+postId}>
        
        <time dateTime={date}>
            <a className={`${classes.link}`} href = {"/blog/"+postId}>{date}</a>
        </time>

        <img className={`${classes.thumbnail}`} src={thumbnail} alt="" />
        
        </a>

        <p>{description}</p>

    </div>)


}


export default Post