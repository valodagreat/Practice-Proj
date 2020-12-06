import React , { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase';
import './Login.css'

function Login() {
    const history = useHistory();
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('');
    
    const signIn = (e)=>{
        e.preventDefault();

        auth.signInWithEmailAndPassword(email,password).then(auth =>{
            if(auth){
                history.push('/')
            }}).catch(err => console.log(err.message));
    }

    const register = (e)=>{
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email,password).then(auth =>{
            if(auth){
                history.push('/')
            }}).catch(err => console.log(err.message));
    }
    return (
        <div className='login'>
            <Link to='/'>
                <img src="https://res.cloudinary.com/valodagreat/image/upload/v1606824330/automotive_m4cfko.jpg" alt="logo" className='login_logo'/>
            </Link> 
            <div className="login_container">
                <h1>Sign In</h1>
                <form >
                    <h5>Email</h5>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <button type='submit' onClick={signIn} className='login_signInButton'>Sign In</button>
                </form>
                <p>By signing in you agree to our condition of use and sale. Please see our Privacy Notice.</p>
                <button onClick={register} className='login_registerButton'>Sign Up</button>
            </div>
        </div>
    )
}

export default Login
