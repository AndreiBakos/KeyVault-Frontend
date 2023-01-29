import { useState } from 'react'
import { api, Page } from '../../data/globalVariables';
import { ValidateEmail } from '../../Utils/ValidateData';
import showPassword  from '../../assets/show-password.svg';
import hidePassword from '../../assets/hide-password.svg';
import axios from 'axios';

export default function SignUp( { setScreen, loggedInUser, setLoggedInUser  }: any ) {
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [ isHidden, setIsHidden ] = useState<boolean>(false);

    const handleSubmit = async() => {
        if(email.length == 0 || password.length === 0 || userName .length === 0) {
            alert('Please fill in all fields!')
            return;
        }

        if(!ValidateEmail(email)){
            alert('Invalid email provided!');
            return;
        }

        if(password.length < 7) {
            alert('Password too short!');
            return;
        }

        if(userName.length < 7){
            alert('UserName too short');
            return;
        }

        var newUser = {
            userName: userName,
            email: email,
            password: password
        }
        //Fetch Data here:
        const response = await api.get('/crypto')
        const token = response.data.jwt;

        localStorage.setItem('token', token);

        const userResponse = await axios.post(`https://localhost:5001/api/users/create`, newUser, {headers: {'Authorization': `Bearer ${token}`}});
        if(userResponse.status === 204){
            alert('Invalid credentials');
            return
        }
        const user = userResponse.data;
        setLoggedInUser(user);
        setScreen(Page.Home);
    }

    return (
        <div className="App" style={{ display: 'grid', placeItems: 'center', height: screen.height / 1.6}}>
        <h1 className='header-text'>Create your account</h1>
        <div className='form-container' style={{ width: screen.width / 2.5 }}>            
        <div className='form-group'>
            <label> Username:</label>
            <input className="form-control" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div className='form-group'>
            <label> Email:</label>
            <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='form-group'>
            <label> Password:</label>
            <div className='password-input-container'>
                <input style={{ border: 0, width: '90%', backgroundColor: '#ffffff00' }} className="form-control" type={ isHidden ? 'password' : 'text' } value={password} onChange={(e) => setPassword(e.target.value)} />
                <img className='show-hide-password' style={{ width: 40, height: 40, alignSelf: 'center'  }} src={isHidden ? hidePassword :showPassword} onClick={() => setIsHidden(!isHidden)} />
            </div>
            </div>
            <div style={{ display: 'flex', color: 'black', alignSelf: 'center' }}>
            <p style={{ color: 'white' }}>Already have an account?</p>
            <button className='log-in-button' onClick={() => setScreen(Page.LogIn)}>Log In</button>
            </div>
            <button className='submit-btn' onClick={handleSubmit}>Sign Up</button>
        </div>
        </div>
  )
}