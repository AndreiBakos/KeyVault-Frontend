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

export default function MySecrets( { userSecrets }: any ) {
    const [ isNewSecretTriggered, setIsNewSecretTriggered ] = useState<boolean>(false);
    const [ newSecretDescription, setNewSecretDescription ] = useState<string>('');

    return (
        <div>
            <div style={{ justifyContent: !isNewSecretTriggered ? 'flex-end' : 'space-between', alignItems: 'center' }} className='create-secret-conatiner'>
                <label hidden={!isNewSecretTriggered} >Enter Secret Title</label>
                <input hidden={!isNewSecretTriggered}  className='create-secret-input' type='text' value={newSecretDescription} onChange={(e) => setNewSecretDescription(e.target.value)} />
                <img className='create-secret-btn' src={isNewSecretTriggered ? closeCreate : createSign} onClick={() => setIsNewSecretTriggered(!isNewSecretTriggered)} />
            </div>
                <div className='secrets-content-container'>
                    {userSecrets.map((secret: Secret) => (
                        <div className='secrets-content' key={secret.id}>
                            <p className='secrets-values'>{secret.title}</p>
                            <p className='secrets-values'>{secret.content}</p>
                            <p className='secrets-values'>{secret.dateCreated}</p>
                        </div>
                            )
                        )
                    }
            </div>
        </div>
    )
}