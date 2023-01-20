import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

const handleSubmit = () => {
  alert(`email: ${email} \n password: ${password}`)
}

  useEffect(() => {
      //fetch data from backend here
  },[])

  return (
    <div className="App" style={{ display: 'grid', placeItems: 'center', height: screen.height / 1.6}}>
      <h1 className='header-text'>Welcome to Key Vault!</h1>
      <div className='form-container' style={{ width: screen.width / 2.5 }}>
        <div className='form-group'>
          <label> Email:</label>
          <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='form-group'>
          <label> Password:</label>
          <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div style={{ display: 'flex', color: 'black', alignSelf: 'center' }}>
          <p>Don't have an account?</p>
          <button className='sign-up-button' onClick={() => alert(2)}>Sign Up</button>
        </div>
        <button className='submit-btn' onClick={handleSubmit}>Login</button>
      </div>
    </div>
  )
}

export default App
