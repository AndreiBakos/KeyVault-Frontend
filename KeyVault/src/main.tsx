import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from './components/Authentication/LogIn';
import Home from './components/Home';
import { ContextComponentProvider } from './Context';
import SignUp from './components/Authentication/SignUp';
import GroupSecrets from './components/GroupSecrets';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/login',
    element: <LogIn />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/groups',
    element: <GroupSecrets />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ContextComponentProvider>
    <RouterProvider router={router} />    
  </ContextComponentProvider>
)
