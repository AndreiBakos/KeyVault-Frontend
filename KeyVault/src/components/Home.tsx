import { useEffect, useState } from 'react';
import { Page } from '../data/globalVariables';
import settingsLogo from '../assets/settings-logo.svg';
import '../Home.css'

export default function Home ( { setScreen }: any ) {
    const [ isSettingsMenu , setIsSettingsMenu ] = useState<boolean>(false);

    return (
        <div>
            <div className='header-menu'>
                <h1 style={{ fontWeight: 'bolder', fontSize: 40 }}>Welcome, Andrei</h1>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img className='settings-menu' style={{ marginRight: 15 }} src={settingsLogo} width={50} height={50} onClick={() => setIsSettingsMenu(!isSettingsMenu)} />
                    <ul className='settings-menu' hidden={!isSettingsMenu}>
                        <li className='settings-menu' style={{ marginBottom: 20 }}>Profile</li>
                        <li className='settings-menu' style={{ color: '#c23030' }} onClick={() => setScreen(Page.LogIn)}>Log Out</li>
                    </ul>
                </div>
            </div>            
            <div className='secrets-container'>
                <p className='secrets-container-header'>My Secrets</p>
                <p className='secrets-container-header'>Group Secrets</p>
            </div>
        </div>
    )
}