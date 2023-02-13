import { useContext, useEffect, useState } from 'react'
import './App.css'
import LogIn from './components/Authentication/LogIn'
import SignUp from './components/Authentication/SignUp';
import Home from './components/Home';
import { Page } from './data/globalVariables';
import { UserForHome } from './data/UserSecrets';
import { ContextComponentProvider, ContextComponent } from './Context';
import { useNavigate } from 'react-router-dom';

function App() {  
  const contextComponent = useContext(ContextComponent);
  const navigate = useNavigate();
  const CheckForUser = () => {
    const user = localStorage.getItem('loggedInUser');
    if(user !== null) {
      const data = JSON.parse(user);
      contextComponent?.setLoggedInUser(data);
      navigate('/home');

    }else{
      navigate('/login');
    }
  }
useEffect(() => {
  CheckForUser();
})
    return (
      <>      
      </>
    )
}

export default App
