import { useEffect, useState } from 'react';
import { api } from '../data/globalVariables';
import {  Secret, SecretForCreation } from '../data/UserSecrets';
import createSign from '../assets/create-sign.svg';
import closeCreate from '../assets/close-create.svg';
import deleteBtn from '../assets/delete-icon.svg';
import '../Home.css'

export default function MySecrets( { loggedInUser, userSecrets, setUserSecrets }: any ) {
    const [ isNewSecretTriggered, setIsNewSecretTriggered ] = useState<boolean>(false);
    const [ newSecretTitle, setNewSecretTitle ] = useState<string>('');
    const [ newSecretDescription, setNewSecretContent ] = useState<string>('');

    const createSecret = async() => {        
        //make Api call here

        const newUserSecret: SecretForCreation = {
            title: newSecretTitle,
            content: newSecretDescription,
            ownerId: loggedInUser.id
        }

        const newSecret = await (await api.post('https://localhost:5001/api/secrets', newUserSecret)).data;
        setUserSecrets((secrets: Secret[]) => [...secrets, newSecret]);
        setNewSecretTitle('');
        setNewSecretContent('');
        setIsNewSecretTriggered(!isNewSecretTriggered);
    }

    const removeSecret = async (secretId: string) => {
        const newSecretsList = userSecrets.filter((secret: Secret) => secret.secretId !== secretId);
        const request = await api.delete(`https://localhost:5001/api/secrets?secretId=${secretId}`);
        setUserSecrets(newSecretsList);
    }

    const getSecrets = async() => {
        const secrets = await api.get(`https://localhost:5001/api/secrets?ownerId=${loggedInUser.id}`);
        setUserSecrets(secrets.data);
    }

    useEffect(() => {        
        getSecrets();
    },[]);

    return (
        <div>
            <div style={{ justifyContent: !isNewSecretTriggered ? 'flex-end' : 'space-between', alignItems: 'center' }} className='create-secret-conatiner'>
                <label hidden={!isNewSecretTriggered} >Enter Secret Title</label>
                <input hidden={!isNewSecretTriggered}  className='create-secret-input' type='text' value={newSecretTitle} onChange={(e) => setNewSecretTitle(e.target.value)} />
                <img className='create-secret-btn' src={isNewSecretTriggered ? closeCreate : createSign} onClick={() => setIsNewSecretTriggered(!isNewSecretTriggered)} />
            </div>
            {
                isNewSecretTriggered 
                    ? 
                    <div>
                        <div style={{ display:'flex', flexDirection: 'row', alignItems: 'center' }} className='create-secret-conatiner'>
                            <label hidden={!isNewSecretTriggered} style={{ fontSize:  18, marginTop: 20, marginBottom: 20 }}>Enter Secret Content</label>
                            <input hidden={!isNewSecretTriggered}  className='create-secret-content-input' type='text' value={newSecretDescription} onChange={(e) => setNewSecretContent(e.target.value)} />
                        </div>
                            <button disabled={newSecretTitle.length === 0 || newSecretDescription.length === 0} className='submit-new-secret' type='submit' onClick={() => createSecret()}>Create Secret</button>
                    </div> 
                    :
                    <div className='secrets-content-container'>
                        {userSecrets.map((secret: Secret) => (
                            <div className='secrets-content' key={secret.secretId}>
                                <p className='secrets-values'>{secret.title}</p>
                                <p className='secrets-values'>{secret.content}</p>
                                <p className='secrets-values'>{secret.dateCreated}</p>
                                <img className='delete-secret-btn' src={deleteBtn} onClick={() => removeSecret(secret.secretId)} />
                            </div>
                                )
                            )
                        }
                    </div>
            }
        </div>
    )
}