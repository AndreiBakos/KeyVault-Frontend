import { useEffect, useState } from 'react'
import { Page } from '../../data/globalVariables';
import { ValidateEmail } from '../../Utils/ValidateData';
import showPassword  from '../../assets/show-password.svg';
import hidePassword from '../../assets/hide-password.svg';

export default function SignUp( { setScreen }: any ) {
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [ isHidden, setIsHidden ] = useState<boolean>(false);

    const handleSubmit = () => {
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

        //Fetch Data here:
        alert('Well Done')
    }

    useEffect(() => {
        //fetch data from backend here
    },[])

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
                <input style={{ border: 0, width: '90%', outline: 'none' }} className="form-control" type={ isHidden ? 'password' : 'text' } value={password} onChange={(e) => setPassword(e.target.value)} />
                <img className='show-hide-password' style={{ width: 40, height: 40, alignSelf: 'center'  }} src={isHidden ? hidePassword :showPassword} onClick={() => setIsHidden(!isHidden)} />
            </div>
            </div>
            <div style={{ display: 'flex', color: 'black', alignSelf: 'center' }}>
            <p>Already have an account?</p>
            <button className='log-in-button' onClick={() => setScreen(Page.LogIn)}>Log In</button>
            </div>
            <button className='submit-btn' onClick={handleSubmit}>Login</button>
        </div>
        </div>
  )
}