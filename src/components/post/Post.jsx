import React from 'react'
import {useState} from 'react'
import classes from './post.module.css'

function Post({date, thumbnail, title, description})
{

    return (<div className={`${classes.post}`}>


        <a href="/">
        
        <time datetime={date}>
            <a className={`${classes.link}`} href="/">{date}</a>
        </time>

        <img className={`${classes.thumbnail}`} src={thumbnail} alt="" />
        
        </a>

        <p>{description}</p>

    </div>)


}


export default Post