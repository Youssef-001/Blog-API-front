import React from 'react'
import classes from './header.module.css'

function Header()
{
    return <>
    
    <nav>
        <h2 className={`${classes.name}`}>Yusef0x1.dev</h2>

        <div className={`${classes.links}`}>
            <a href="/blog">/blog</a>
            <a href="/projects">/projects</a>
            <a href="/chat">/chat</a>
        </div>

    </nav>
    
    </>
}

export default Header;
