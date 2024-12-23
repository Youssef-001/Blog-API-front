import React from 'react';

import classes from './info.module.css'

import MyImage from '/home/yusef0x1/Programming/Odin/blog-API-front/src/assets/thumbnail.jpeg';

function Info()
{

    return <>
    

    <div className={`${classes.info}`}>
    <img className={`${classes.avatar}`} src="src/assets/kratz.jpeg"></img>

            <div className={`${classes.links}`}>
                <a href="/blog">/blog</a>
                <a href="#">/projects</a>
                <a href="#">/social</a>
            </div>


    <h1>Web Developer & Algorithm Enthusiast</h1>
    <p>
    I specialize in building efficient, user-friendly web applications using React and Node.js. Skilled in C++, 
    web development, and data structures, I love solving complex problems and creating intuitive solutions. 
    I'm also exploring algorithm visualization and enhancing my design skills.
    </p>




    </div>
    
    
    </>

}

export default Info;