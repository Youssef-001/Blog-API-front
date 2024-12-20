import classes from './create-post.module.css';
import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import Editor from './TinyMCE';
import { useLocation } from 'react-router-dom';


function CreatePost() {
    const location = useLocation(); // Get location object
    console.log(location.state)
    const [title, setTitle] = useState(location.state?location.state.oldTitle : '');
    const [cover, setCover] = useState(location.state? location.state.oldCover : ''); // Ensure the cover is null initially, and the file is stored here
    const [content, setContent] = useState(location.state ? location.state.oldContent : '');
    let url_parts = location.pathname.split('/');
    let id = url_parts[url_parts.length-1];

    

    console.log(id);
    const handleEditorChange = (newContent) => {
        setContent(newContent); // Update state with editor value
        console.log("Content was updated:", newContent);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value); // Update local state
    }

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        setCover(file); // Update local state
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('cover', cover);

        
        let token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        let response;
        if (decodedToken.username === 'admin') {
            console.log(location.pathname)

            if (location.pathname.includes('/edit'))
            {
                debugger;

                for (var key of formData.entries()) {
                    console.log(key[0] + ', ' + key[1]);}

                 response = await fetch(`http://localhost:4000/posts/${id}`, {
                    method: "PUT",
                    headers: { "Authorization": `Bearer ${token}` },
                    body: formData, // Send the FormData as the body
                });
            }
            
            else{

             response = await fetch("http://localhost:4000/posts", {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` },
                body: formData, // Send the FormData as the body
            });}

            if (response) {
                const data = await response.json();
            }
        }
        console.log(formData);
    };

    return (
        <main>
            <h1>Write a New Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        value={title}
                        type="text"
                        onChange={handleTitleChange}
                        name="title"
                        placeholder="Enter post title"
                    />
                </div>

                <div>
                    <label htmlFor="cover">Cover Image</label>
                    <input
                        
                        type="file"
                        onChange={handleCoverChange} // Get the file object from the input
                        name="cover"
                        id="cover"
                    />
                </div>

                <div>
                    <label htmlFor="content"></label>
                    <Editor handleEditorChange={handleEditorChange} initialValue={content || ''}></Editor>
                </div>

                <button className={`${classes.publish_btn}`} type="submit">Publish Post</button>
            </form>
        </main>
    );
}

export default CreatePost;




//TODO:  formData empty