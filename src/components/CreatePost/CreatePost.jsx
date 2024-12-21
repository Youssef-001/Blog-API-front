import classes from './create-post.module.css';
import React, { useState, useRef, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import Editor from './TinyMCE';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const location = useLocation();
  const [title, setTitle] = useState(location.state ? location.state.oldTitle : '');
  const [cover, setCover] = useState(location.state ? location.state.oldCover : '');
  const [content, setContent] = useState(location.state ? location.state.oldContent : '');
  const [submitButton, setSubmitButton] = useState(false);
  const [coverText, setCoverText] = useState('Choose a file');
  let url_parts = location.pathname.split('/');
  let id = url_parts[url_parts.length - 1];
  const navigate = useNavigate();

  const submitRef = useRef(null);
  const uploadRef = useRef(null);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setCover(file);
    
    if (file) {
      setCoverText(`File selected: ${file.name}`);
      setSubmitButton(true);
    } else {
      setCoverText('Choose a file');
      setSubmitButton(false);
    }
  };

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
      if (location.pathname.includes('/edit')) {
        response = await fetch(`http://localhost:4000/posts/${id}`, {
          method: "PUT",
          headers: { "Authorization": `Bearer ${token}` },
          body: formData,
        });
      } else {
        response = await fetch("http://localhost:4000/posts", {
          method: "POST",
          headers: { "Authorization": `Bearer ${token}` },
          body: formData,
        });
      }

      if (response) {
        const data = await response.json();
      }
    }

    navigate('/blog');
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
          <label htmlFor="cover" className={classes.custom_file_upload}>
            {coverText}
          </label>
          <input
            type="file"
            onChange={handleCoverChange}
            name="cover"
            id="cover"
            ref={uploadRef}
            className={classes.file_upload}
          />
        </div>

        <div>
          <label htmlFor="content"></label>
          <Editor handleEditorChange={handleEditorChange} initialValue={content || ''}></Editor>
        </div>

        {submitButton ? 
          <button ref={submitRef} className={classes.publish_btn} type="submit">Publish Post</button> 
          : 
          <button disabled ref={submitRef} className={classes.publish_btn} type="submit">Publish Post</button>
        }
      </form>
    </main>
  );
}

export default CreatePost;
