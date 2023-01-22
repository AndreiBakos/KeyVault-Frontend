import { useEffect, useState } from 'react';
import { Page, SecretsPage } from '../data/globalVariables';
import { GroupSecrets, Secret, UserForHome } from '../data/UserSecrets';
import { secrets } from '../data/MockData/UserSecrets';
import { groupSecretsData } from '../data/MockData/GroupSecrets';
import settingsLogo from '../assets/settings-logo.svg';
import createSign from '../assets/create-sign.svg';
import closeCreate from '../assets/close-create.svg';
import enterGroupSecret from '../assets/acces-group-secret.svg';
import '../Home.css'

export default function Home ( { setScreen }: any ) {
    const [ isSettingsMenu , setIsSettingsMenu ] = useState<boolean>(false);
    const [ userSecrets, setUserSecrets ] = useState<Secret[]>(secrets);
    const [ groupSecrets, setGroupSecrets ] = useState<GroupSecrets[]>(groupSecretsData);
    const [ currentSecretsPage, setCurrentSecretsPage ] = useState<SecretsPage>(SecretsPage.MySecrets);
    const [ newSecret, setNewSecret ] = useState<Secret>();
    const [ newSecretDescription, setNewSecretDescription ] = useState<string>('');
    const [ isNewSecretTriggered, setIsNewSecretTriggered ] = useState<boolean>(false);

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
                <h1 style={{ fontWeight: 'bolder', fontSize: 40 }}>Welcome, Andrei</h1>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img className='settings-menu' style={{ marginRight: 15 }} src={settingsLogo} width={50} height={50} onClick={() => setIsSettingsMenu(!isSettingsMenu)} />
                    <ul className='settings-menu' hidden={!isSettingsMenu}>
                        <li className='settings-menu' style={{ marginBottom: 20 }}>Profile</li>
                        <li className='settings-menu' style={{ color: '#c23030' }} onClick={() => setScreen(Page.LogIn)}>Log Out</li>
                    </ul>
                </div>
            </div>            
            <div className='secrets-menu-container'>
                <p onClick={async() => await setCurentSecretsPage(SecretsPage.GroupSecrets)} style={{ backgroundColor: currentSecretsPage === SecretsPage.MySecrets ? '#646cff' : '#404040' }} className='secrets-container-header'>My Secrets</p>
                <p onClick={async() => await setCurentSecretsPage(SecretsPage.MySecrets)} style={{ backgroundColor: currentSecretsPage === SecretsPage.GroupSecrets ? '#646cff' : '#404040' }} className='secrets-container-header'>Group Secrets</p>
            </div>
            <div style={{ justifyContent: !isNewSecretTriggered ? 'flex-end' : 'space-between' }} className='create-secret-conatiner'>
                <label hidden={!isNewSecretTriggered} >Create Secret</label>
                <input hidden={!isNewSecretTriggered}  className='create-secret-input' type='text' value={newSecretDescription} onChange={(e) => setNewSecretDescription(e.target.value)} />
                <img className='create-secret-btn' src={isNewSecretTriggered ? closeCreate : createSign} onClick={() => setIsNewSecretTriggered(!isNewSecretTriggered)} />
            </div>
            <div className='secrets-content-container'>
                {
                    currentSecretsPage === SecretsPage.MySecrets
                        ?
                        userSecrets.map((secret: Secret) => (                        
                            <div className='secrets-content'>
                                <p className='secrets-values'>{secret.title}</p>
                                <p className='secrets-values'>{secret.content}</p>
                                <p className='secrets-values'>{secret.dateCreated}</p>
                            </div>
                        ))
                        :
                        groupSecrets.map((secret: GroupSecrets) => (
                            <div className='group-secrets-content'>
                                <p className='secrets-values'>{secret.title}</p>
                                <p className='secrets-values'>Owner: {secret.owner}</p>                            
                                <div style={{ display: 'flex', alignItems: 'center', paddingRight: 20 }}>
                                    <p style={{ fontWeight: 'bolder', marginRight: 12 }}>Members:</p>
                                    {
                                        secret.members.map((member: UserForHome, index: number) => (
                                            <div style={{ display: 'flex' }}>
                                                <p>{member.userName}</p>
                                                { index < secret.members.length - 1 
                                                    && <p>,</p>
                                                }
                                            </div>
                                        ))
                                    }                    
                                </div>
                                <img className='enter-group-secret' style={{ width: 30, height: 30, alignSelf: 'center', paddingRight: 50 }} src={enterGroupSecret} onClick={() => {}} />
                            </div>
                        ))
                }
            </div>
        </div>
    )
}