import { useEffect, useState } from 'react';
import { Page, SecretsPage } from '../data/globalVariables';
import { GroupSecretsData, Secret, UserForHome } from '../data/UserSecrets';
import { secrets } from '../data/MockData/UserSecrets';
import { groupSecretsData } from '../data/MockData/GroupSecrets';
import settingsLogo from '../assets/settings-logo.svg';
import MySecrets from './MySecrets';
import GroupSecrets from './GroupSecrets';
import '../Home.css'

export default function Home ( { setScreen, loggedInUser, setLoggedInUser }: any ) {
    const [ isSettingsMenu , setIsSettingsMenu ] = useState<boolean>(false);
    const [ userSecrets, setUserSecrets ] = useState<Secret[]>(secrets);
    const [ groupsList, setGroupsList ] = useState<GroupSecretsData[]>(groupSecretsData);
    const [ currentSecretsPage, setCurrentSecretsPage ] = useState<SecretsPage>(SecretsPage.MySecrets);
    const [ newSecret, setNewSecret ] = useState<Secret>();

    const setCurentSecretsPage = async (page: number) => {
        if(page === SecretsPage.MySecrets) {
            setCurrentSecretsPage(SecretsPage.GroupSecrets);
        } else {
            setCurrentSecretsPage(SecretsPage.MySecrets);
        }
    }

    return (
        <div>
            <div className='header-menu'>
                <h1 style={{ fontWeight: 'bolder', fontSize: 40 }}>Welcome, {loggedInUser.userName}</h1>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img className='settings-menu' style={{ marginRight: 15 }} src={settingsLogo} width={50} height={50} onClick={() => setIsSettingsMenu(!isSettingsMenu)} />
                    <ul className='settings-menu' hidden={!isSettingsMenu}>
                        <li className='settings-menu' style={{ marginBottom: 20 }}>Profile</li>
                        <li className='settings-menu' style={{ color: '#c23030' }} onClick={() => setScreen(Page.LogIn)}>Log Out</li>
                    </ul>
                </div>
            </div>            
            <div className='secrets-menu-container'>
                <p onClick={
                    async() => 
                        await setCurentSecretsPage(SecretsPage.GroupSecrets)} 
                        style={
                            {
                                 backgroundColor: 
                                    currentSecretsPage === SecretsPage.MySecrets 
                                        ? '#646cff'
                                        : '#404040'
                            }
                        }
                        className='secrets-container-header'>My Secrets</p>
                <p onClick={
                    async() => await setCurentSecretsPage(SecretsPage.MySecrets)}
                    style={
                        {
                            backgroundColor:
                                currentSecretsPage === SecretsPage.GroupSecrets
                                    ? '#646cff'
                                    : '#404040'
                        }
                    }
                    className='secrets-container-header'>Group Secrets</p>
            </div>    
            {
                currentSecretsPage === SecretsPage.MySecrets
                    ?
                    <MySecrets userSecrets={userSecrets} setUserSecrets={setUserSecrets} />
                    :
                    <GroupSecrets groupsList={groupsList} setGroupsList={setGroupsList} />
            }
        
        </div>
    )
}