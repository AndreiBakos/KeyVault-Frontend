import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Page, SecretsPage } from '../data/globalVariables';
import { GroupSecretsData, Secret, UserForHome } from '../data/UserSecrets';
import { secrets } from '../data/MockData/UserSecrets';
import { groupSecretsData } from '../data/MockData/GroupSecrets';
import createSign from '../assets/create-sign.svg';
import closeCreate from '../assets/close-create.svg';
import enterGroupSecret from '../assets/acces-group-secret.svg';
import backToGroups from '../assets/back-to-groups.svg';
import '../Home.css'
interface GroupProps {
    title: string,
    secrets: Secret[],
    isGroupEntered: SetStateAction<boolean>,
    setIsGroupEntered: Dispatch<SetStateAction<boolean>>
}
export default function( { title, secrets, isGroupEntered, setIsGroupEntered }: GroupProps ) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img className='enter-group-secret' style={{ width: 40, height: 40 }} src={backToGroups} onClick={() => setIsGroupEntered(!isGroupEntered)} />
                        <p style={{ fontWeight: 'bolder', fontSize: 30, marginLeft: 20, paddingTop: 3 }}>{title}</p>
                    </div>
                    <button className='delete-group-btn' type='submit' onClick={() => {}}>Delete Group</button>
                </div>
                <div className='secrets-content-container'>
                    {                    
                        secrets.map((secret: Secret) => (
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