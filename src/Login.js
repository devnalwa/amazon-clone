import React, { useState } from 'react'
import './Login.css'
import { Link, useHistory } from "react-router-dom"
import { auth } from "./firebase"

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState(''); // Passing in an Empy string (dont pass in null);
    const [password, setPassword] = useState(''); // Passing in an Empy string (dont pass in null);

    // Function for Custom Signing In
    const signIn = e => {
        e.preventDefault(); //Stops the Page from refreshing

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {   // Similar to If Statement, if auth, successfull, then go to homepage or else error message.
                history.push('/') // Pushing/redirecting user to homepage after successful sign In autharization.
            })
            .catch(error => alert(error.message))  // Catching errors from authentication process (Error Handling).

    }
    // Function for Custom Registration 
    const register = e => {
        e.preventDefault(); //Stops the Page from refreshing

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // It succesfully created a new user with an email and password.
                console.log(auth);
                if (auth) {
                    history.push('/') // Pushing/redirecting user to homepage after successful autharization.
                }
            })
            .catch(error => alert(error.message))  // Catching errors from authentication process (Error Handling).


    }


    return (
        <div className='login' >
            <Link to='/'>
                <img
                    className="login_logo"
                    src="https://i.insider.com/539f3ffbecad044276726c01?width=1100&format=jpeg&auto=webp"
                />
            </Link>

            <div className='login_container'>
                <h1>Sign-In</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} /> {/* Sets email to whatever user enters and maps to main email variable on top */}

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} /> {/* Sets password to whatever user enters and maps to main password variable on top */}

                    <button type='submit' onClick={signIn} className='login_signInButton'>Sign In</button>
                </form>

                <p>
                    By signing-in, you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button onClick={register} className='login_registerButton'>Create Your Amazon Account</button>

            </div>

        </div >
    )
}

export default Login
