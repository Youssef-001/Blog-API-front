import react from 'react'
import classes from './login.module.css'

function Login()
{

    return <>
    
    <main>
        <h2>Login</h2>

        <form action="http://localhost:4000/login" method="POST">
        
            <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder='Enter your username'/>

            </div>


            <div>

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="" placeholder='Enter your password' />
            </div>

            <button type="submit">Log in</button>
        
        </form>
    </main>
    
    </>

}

export default Login