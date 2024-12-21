import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  Header from './components/header/Header';
import Info from './components/info/Info'
import hljs from 'highlight.js';
import {useEffect} from 'react'

function CodeSnippet() {
  const code = `
    import React, { useState, useEffect } from "react";

    function EditPost({ postId }) {
        const [title, setTitle] = useState("");
        const [content, setContent] = useState("");
        // Additional code here...
    }
  `;

  return (
    <pre className="language-javascript">
      <code>{code}</code>
    </pre>
  );
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header></Header>
      <Info></Info>



    </>
  )
}

export default App
