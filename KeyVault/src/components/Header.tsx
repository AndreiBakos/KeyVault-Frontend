import { useContext, useState } from "react";
import { ContextComponent } from "../Context";
import { SecretsPage } from "../data/globalVariables";
import settingsLogo from '../assets/settings-logo.svg';
import { useNavigate } from "react-router-dom";


export default function Header({ currentPage }: any) {
    const contextComponent = useContext(ContextComponent);
    const [ isSettingsMenu , setIsSettingsMenu ] = useState<boolean>(false);
    const navigate = useNavigate();

    const Logout = () => {
        contextComponent?.setLoggedInUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        navigate('/');
    }

    return (
        <div>
            <div className='header-menu'>
                <h1 style={{ fontWeight: 'bolder', fontSize: 40 }}>Welcome, {contextComponent?.loggedInUser?.userName}</h1>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img className='settings-menu' style={{ marginRight: 15 }} src={settingsLogo} width={50} height={50} onClick={() => setIsSettingsMenu(!isSettingsMenu)} />
                    <ul className='settings-menu' hidden={!isSettingsMenu}>
                        <li className='settings-menu' style={{ color: '#c23030' }} onClick={() => Logout()}>Log Out</li>
                    </ul>
                </div>
            </div>            
            <div className='secrets-menu-container'>
                <p onClick={() => navigate('/home')} 
                        style={
                            {
                                 backgroundColor: 
                                    currentPage === SecretsPage.MySecrets 
                                        ? '#646cff'
                                        : '#404040'
                            }
                        }
                        className='secrets-container-header'>My Secrets</p>
                <p onClick={() => navigate('/groups')}
                    style={
                        {
                            backgroundColor:
                                currentPage === SecretsPage.GroupSecrets
                                    ? '#646cff'
                                    : '#404040'
                        }
                    }
                    className='secrets-container-header'>Group Secrets</p>
            </div>
        </div>
    );
}