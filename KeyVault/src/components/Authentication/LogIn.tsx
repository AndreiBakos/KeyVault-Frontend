import { useContext, useEffect, useState } from 'react'
import { api, Page } from '../../data/globalVariables';
import { ValidateEmail } from '../../Utils/ValidateData';
import showPassword  from '../../assets/show-password.svg';
import hidePassword from '../../assets/hide-password.svg';
import { SHA256 } from 'crypto-js';
import { ContextComponent } from '../../Context';
import { useNavigate } from 'react-router-dom';

export default function LogIn() {
    const contextComponent = useContext(ContextComponent);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [ isHidden, setIsHidden ] = useState<boolean>(true);
    const navigate = useNavigate();

    const handleSubmit = async() => {    
        if(email.length == 0 || password.length === 0) {
            alert('Please fill in all fields!')
            return;
        }
        
        if(!ValidateEmail(email)){
            alert('Invalid email provided!')
            return;
        }
        
        if(password.length < 7) {
            alert('Password too short!');
            return;
        }
        
        //Fetch Data here:
        const response = await api.get('/crypto')
        const token = response.data.jwt;
        localStorage.setItem('token', token);

        const hashedPassword = SHA256(password).toString();
        const userResponse = await api.get(`https://localhost:5001/api/users/login?email=${email}&password=${hashedPassword}`);
        if(userResponse.status === 204){
            alert('Invalid credentials');
            return
        }
        const user = userResponse.data;
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        contextComponent?.setLoggedInUser(user);
        navigate('/home')
    }

    return (
        <div className="App" style={{ display: 'grid', placeItems: 'center', height: screen.height / 1.6}}>
            <h1 className='header-text'>Welcome to KeyVault!</h1>
            <div className='form-container' style={{ width: screen.width / 2.5 }}>
                <div className='form-group'>
                    <label> Email:</label>
                    <input style={{ border: 0 }} className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label> Password:</label>
                    <div className='password-input-container'>
                        <input style={{ border: 0, width: '90%', backgroundColor: '#ffffff00' }} className="form-control" type={ isHidden ? 'password' : 'text' } value={password} onChange={(e) => setPassword(e.target.value)} />
                        <img className='show-hide-password' style={{ width: 40, height: 40, alignSelf: 'center'  }} src={isHidden ? hidePassword :showPassword} onClick={() => setIsHidden(!isHidden)} />
                    </div>
                </div>
                <div style={{ display: 'flex', color: 'black', alignSelf: 'center' }}>
                    <p style={{ color: '#ffffffee' }}>Don't have an account?</p>
                    <button className='sign-up-button' onClick={() => navigate('/signup')}>Sign Up</button>
                </div>
                <button className='submit-btn' type='submit' onClick={handleSubmit}>Login</button>
            </div>
        </div>
  )
}