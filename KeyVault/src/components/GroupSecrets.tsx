import { useEffect, useState } from 'react';
import { Page, SecretsPage } from '../data/globalVariables';
import { GroupSecretsData, Secret, UserForHome } from '../data/UserSecrets';
import { secrets } from '../data/MockData/UserSecrets';
import { groupSecretsData } from '../data/MockData/GroupSecrets';
import settingsLogo from '../assets/settings-logo.svg';
import createSign from '../assets/create-sign.svg';
import closeCreate from '../assets/close-create.svg';
import enterGroupSecret from '../assets/acces-group-secret.svg';
import '../Home.css'

export default function GroupSecrets( { groupSecrets }: any ) {
    const [ isNewSecretTriggered, setIsNewSecretTriggered ] = useState<boolean>(false);
    const [ newSecretDescription, setNewSecretDescription ] = useState<string>('');

    return (
        <div>
            <div style={{ justifyContent: !isNewSecretTriggered ? 'flex-end' : 'space-between' }} className='create-secret-conatiner'>
                <label hidden={!isNewSecretTriggered} >Enter Group Name</label>
                <input hidden={!isNewSecretTriggered}  className='create-secret-input' type='text' value={newSecretDescription} onChange={(e) => setNewSecretDescription(e.target.value)} />
                <img className='create-secret-btn' src={isNewSecretTriggered ? closeCreate : createSign} onClick={() => setIsNewSecretTriggered(!isNewSecretTriggered)} />            
            </div>
            <div className='secrets-content-container'>
                {
                    groupSecrets.map((secret: GroupSecretsData) => (
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
                        )
                    )
                }
            </div>
        </div>
    )
}