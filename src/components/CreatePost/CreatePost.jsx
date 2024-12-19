import classes from './create-post.module.css';
import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import Editor from './TinyMCE';
import { useLocation } from 'react-router-dom';


function CreatePost() {
    const location = useLocation(); // Get location object
    console.log(location.state)
    const [title, setTitle] = useState(location.state.oldTitle || '');
    const [cover, setCover] = useState(location.state.oldCover || ''); // Ensure the cover is null initially, and the file is stored here
    const [content, setContent] = useState(location.state.oldContent || '');
    console.log(location.pathname)
    const handleEditorChange = (newContent) => {
        setContent(newContent); // Update state with editor value
        console.log("Content was updated:", newContent);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        
        let token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);

        if (decodedToken.username === 'admin') {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            if (cover) {
                formData.append("cover", cover); // Append the file to the form data
            }
            if (location.pathname.includes('/edit'))
            {
                const response = await fetch("http://localhost:4000/edit/posts", {
                    method: "PUT",
                    headers: { "Authorization": `Bearer ${token}` },
                    body: formData, // Send the FormData as the body
                });
            }
            
            else{
            const response = await fetch("http://localhost:4000/posts", {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` },
                body: formData, // Send the FormData as the body
            });}

            if (response) {
                const data = await response.json();
                console.log(data);
            }
        }
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
                        onChange={(e) => setTitle(e.target.value)}
                        name="title"
                        placeholder="Enter post title"
                    />
                </div>

                <div>
                    <label htmlFor="cover">Cover Image</label>
                    <input
                        
                        type="file"
                        onChange={(e) => setCover(e.target.files[0])} // Get the file object from the input
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
