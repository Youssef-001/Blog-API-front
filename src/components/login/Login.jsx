import react from 'react'
import classes from './login.module.css'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



function Login()
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Hook for navigation


    const handleLogin = async () => {
        const response = await fetch("http://localhost:4000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        console.log(data);

    
        if (data.access_token) {
          localStorage.setItem("token", data.access_token); // Store token in localStorage
          console.log("Token saved!");
          navigate('/blog')

        }


      };

    return <>
    
    <main>
        <h2>Login</h2>

        <form onSubmit={(e) => e.preventDefault()}>
        
            <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder='Enter your username' value={username}   onChange={(e) => setUsername(e.target.value)} 
            />

            </div>


            <div>

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="" placeholder='Enter your password' value={password}   onChange={(e) => setPassword(e.target.value)} 
            />
            </div>

            <button type="submit" onClick={handleLogin}>Log in</button>
        
        </form>
    </main>
    
    </>

}

export default Login