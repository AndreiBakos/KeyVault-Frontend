import { useState } from 'react'
import './App.css'
import LogIn from './components/Authentication/LogIn'
import SignUp from './components/Authentication/SignUp';
import Home from './components/Home';
import { Page } from './data/globalVariables';

function App() {  
  const [ screen, setScreen ] = useState<Page>();

  const renderScreen = (account: Page | undefined) => {
    switch(account){
      case Page.LogIn: return (<LogIn setScreen={setScreen} />)
      case Page.SignUp: return (<SignUp setScreen={setScreen} />)
      case Page.Home: return (<Home setScreen={setScreen} />)
      default: return (<LogIn setScreen={setScreen} />)
    }
  }

    return (renderScreen(screen))
}

export default App
