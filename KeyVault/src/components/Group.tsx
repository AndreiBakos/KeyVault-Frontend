import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { GroupSecretsData, Secret, UserForHome } from '../data/UserSecrets';
import createSign from '../assets/create-sign.svg';
import closeCreate from '../assets/close-create.svg';
import enterGroupSecret from '../assets/acces-group-secret.svg';
import backToGroups from '../assets/back-to-groups.svg';
import deleteBtn from '../assets/delete-icon.svg';
import '../Home.css'

interface GroupProps {
    currentGroup: GroupSecretsData,
    setCurrentGroup: Dispatch<SetStateAction<GroupSecretsData>>, 
    groupsList: GroupSecretsData[],
    setGroupsList: Dispatch<SetStateAction<GroupSecretsData[]>>,
    isGroupEntered: SetStateAction<boolean>,
    setIsGroupEntered: Dispatch<SetStateAction<boolean>>
}


export default function( { currentGroup, setCurrentGroup, groupsList, setGroupsList, isGroupEntered, setIsGroupEntered }: GroupProps ) {
    const removeGroup = () => {
        const newGroupsList = groupsList.filter((group: GroupSecretsData) => group.id !== currentGroup.id);
        setGroupsList(newGroupsList);
        setIsGroupEntered(!isGroupEntered)
    }

    const removeSecret = (secretId: number) => {
        const newGroup: GroupSecretsData = {
            id: currentGroup.id,
            title: currentGroup.title,
            secrets: currentGroup.secrets.filter((secret: Secret) => secret.id !== secretId),
            members: currentGroup.members,
            owner: currentGroup.owner
        }
        setCurrentGroup(newGroup);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img className='enter-group-secret' style={{ width: 40, height: 40 }} src={backToGroups} onClick={() => setIsGroupEntered(!isGroupEntered)} />
                        <p style={{ fontWeight: 'bolder', fontSize: 30, marginLeft: 20, paddingTop: 3 }}>{currentGroup.title}</p>
                    </div>
                    <button className='delete-group-btn' type='submit' onClick={() => removeGroup()}>Delete Group</button>
                </div>
                <div className='secrets-content-container'>
                    {                    
                        currentGroup.secrets.map((secret: Secret) => (
                            <div className='secrets-content' key={secret.id}>
                                <p className='secrets-values'>{secret.title}</p>
                                <p className='secrets-values'>{secret.content}</p>
                                <p className='secrets-values'>{secret.dateCreated}</p>
                                <img className='delete-secret-btn' src={deleteBtn} onClick={() => removeSecret(secret.id)} />
                            </div>
                            )
                        )
                    }
                </div>                
            </div>
    )
}