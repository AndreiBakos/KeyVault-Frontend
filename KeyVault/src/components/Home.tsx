import { useContext, useEffect, useState } from 'react';
import { Page, SecretsPage } from '../data/globalVariables';
import { GroupSecretsData, Secret, UserForHome } from '../data/UserSecrets';
import MySecrets from './MySecrets';
import GroupSecrets from './GroupSecrets';
import '../Home.css'
import { ContextComponent } from '../Context';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

export default function Home () {
    const navigate = useNavigate();
    const contextComponent = useContext(ContextComponent);
    const [ userSecrets, setUserSecrets ] = useState<Secret[]>([]);

    const CheckIfUserExists = () => {
        const user = localStorage.getItem('loggedInUser');
        if(user !== null){
            const data = JSON.parse(user);
            contextComponent?.setLoggedInUser(data);
        }else{
            navigate('/');
        }
    }

    useEffect(() => {
        CheckIfUserExists()
    },[])
    return (
        <div>
            <Header currentPage={SecretsPage.MySecrets} />    
            <MySecrets userSecrets={userSecrets} setUserSecrets={setUserSecrets} />
        </div>
    )
}