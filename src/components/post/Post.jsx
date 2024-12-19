import React from 'react'
import {useState} from 'react'
import classes from './post.module.css'
import ContentComponent from '../ContentComponent'

function Post({date, thumbnail, title, description, postId})
{
    
    return (<div className={`${classes.post}`}>


        <a href={"/blog/"+postId}>
        <time dateTime={date}>
            <a className={`${classes.link}`} href = {"/blog/"+postId}>{date}</a>
        </time>

        <img className={`${classes.thumbnail}`} src={thumbnail} alt="" />
        
        </a>

        <h2>{title}</h2>


    </div>)


}


export default Post