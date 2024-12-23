import React from 'react'
import {useState} from 'react'
import classes from './post.module.css'
import ContentComponent from '../ContentComponent';
import ReactLoading from 'react-loading';
import hljs from 'highlight.js';

const Example = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={200} width={200} />
);

function Post({date, thumbnail, title, description, postId})
{

    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false); 
    };
    
    return (<div className={`${classes.post}`}>



        <a className={`${classes.card}`} href={"/blog/"+postId}>
        <time dateTime={date}>
            <a className={`${classes.link}`} href = {"/blog/"+postId}>{date}</a>
        </time>
        <img className={`${classes.thumbnail}`} src={thumbnail} onLoad={handleImageLoad} alt="" />



        <div>

        </div>
        
        </a>

        <h2 className={`${classes.card_title}`}>{title}</h2>
        {isLoading && <div className={`${classes.circular_spinner}`}></div>} 


    </div>)


}


export default Post