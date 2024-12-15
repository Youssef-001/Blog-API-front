import React from 'react';

import classes from './info.module.css'

import MyImage from '/home/yusef0x1/Programming/Odin/blog-API-front/src/assets/thumbnail.jpeg';

function Info()
{

    return <>
    

    <div className={`${classes.info}`}>
    <img src="src/assets/thumbnail.jpeg"></img>


    <h1>Web Developer & Algorithm Enthusiast</h1>
    <p>
    I specialize in building efficient, user-friendly web applications using React and Node.js. Skilled in C++, 
    web development, and data structures, I love solving complex problems and creating intuitive solutions. 
    I'm also exploring algorithm visualization and enhancing my design skills."
    </p>


    <div className={`${classes.social}`}>
        <a href="/linkedin">/Linkedin</a>
        <a href="/github">/Github</a>
        <a href="/leetcode">/Leetcode</a>
    </div>

    </div>
    
    
    </>

}

export default Info;