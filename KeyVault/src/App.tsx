import { useState } from 'react'
import './App.css'
import LogIn from './components/Authentication/LogIn'
import SignUp from './components/Authentication/SignUp';
import Home from './components/Home';
import { Page } from './data/globalVariables';
import { UserForHome } from './data/UserSecrets';

function App() {  
  const [ screen, setScreen ] = useState<Page>();
  const [ loggedInUser, setLoggedInUser ] = useState<UserForHome>();

  const renderScreen = (account: Page | undefined) => {
    switch(account){
      case Page.LogIn: return (<LogIn setScreen={setScreen} setLoggedInUser={setLoggedInUser} />)
      case Page.SignUp: return (<SignUp setScreen={setScreen} setLoggedInUser={setLoggedInUser} />)
      case Page.Home: return (<Home setScreen={setScreen} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />)
      default: return (<LogIn setScreen={setScreen} setLoggedInUser={setLoggedInUser} />)
    }
  }

    return (renderScreen(screen))
}

export default App
