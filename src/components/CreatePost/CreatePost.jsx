import classes from './create-post.module.css';
import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import Editor from './TinyMCE';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [cover, setCover] = useState(null); // Ensure the cover is null initially, and the file is stored here
    const [content, setContent] = useState('');

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

            const response = await fetch("http://localhost:4000/posts", {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` },
                body: formData, // Send the FormData as the body
            });

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
                    <Editor handleEditorChange={handleEditorChange}></Editor>
                </div>

                <button className={`${classes.publish-btn}`} type="submit">Publish Post</button>
            </form>
        </main>
    );
}

export default CreatePost;
