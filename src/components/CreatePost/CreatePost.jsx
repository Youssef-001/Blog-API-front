import classes from './create-post.module.css'
import React from 'react'

import Editor from './TinyMCE'
function CreatePost()
{

    return (
        <main>
        <h1>Write a New Post</h1>
        <form action="http://localhost:4000/posts" method="POST">
        
        <div>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" placeholder='Enter post title'/>
        </div>

        <div>
        <label htmlFor="cover">Cover Image</label>
        <input type="file" name="cover" id="cover" />

        </div>

        <div>

        <label htmlFor="content"></label>
        <Editor ></Editor>

        </div>
        

        <button type="submit">Publish Post</button>
        </form>

        </main>
    )


}

export default CreatePost