import { useEffect, useState } from 'react';
import { Page, SecretsPage } from '../data/globalVariables';
import { emptyGroup, emptySecret, GroupSecretsData, Secret, UserForHome } from '../data/UserSecrets';
import { secrets } from '../data/MockData/UserSecrets';
import { groupSecretsData } from '../data/MockData/GroupSecrets';
import createSign from '../assets/create-sign.svg';
import closeCreate from '../assets/close-create.svg';
import enterGroupSecret from '../assets/acces-group-secret.svg';
import backToGroups from '../assets/back-to-groups.svg';
import '../Home.css'
import Group from './Group';

export default function GroupSecrets( { groupsList, setGroupsList }: any ) {
    const [ isNewSecretTriggered, setIsNewSecretTriggered ] = useState<boolean>(false);
    const [ newSecretDescription, setNewSecretDescription ] = useState<string>('');
    const [ isGroupEntered, setIsGroupEntered ] = useState<boolean>(false);
    const [ currentGroup, setCurrentGroup ] = useState<GroupSecretsData>(emptyGroup);

    const handleScreenChange = ( group: GroupSecretsData ) => {
        setCurrentGroup(group);
        setIsGroupEntered(!isGroupEntered);    
    }
    if(isGroupEntered){
        return(
            <Group currentGroup={currentGroup} setCurrentGroup={setCurrentGroup} groupsList={groupsList} setGroupsList={setGroupsList} isGroupEntered={isGroupEntered} setIsGroupEntered={setIsGroupEntered} />
        )
    }else{
        return (
            <div>
                <div style={{ justifyContent: !isNewSecretTriggered ? 'flex-end' : 'space-between' }} className='create-secret-conatiner'>
                    <label hidden={!isNewSecretTriggered} >Enter Group Name</label>
                    <input hidden={!isNewSecretTriggered}  className='create-secret-input' type='text' value={newSecretDescription} onChange={(e) => setNewSecretDescription(e.target.value)} />
                    <img className='create-secret-btn' src={isNewSecretTriggered ? closeCreate : createSign} onClick={() => setIsNewSecretTriggered(!isNewSecretTriggered)} />            
                </div>
                <div className='secrets-content-container'>
                    {
                        groupsList.map((group: GroupSecretsData) => (
                            <div className='group-secrets-content'>
                                <p className='secrets-values'>{group.title}</p>
                                <p className='secrets-values'>Owner: {group.owner}</p>                            
                                <div style={{ display: 'flex', alignItems: 'center', paddingRight: 20 }}>
                                    <p style={{ fontWeight: 'bolder', marginRight: 12 }}>Members:</p>
                                    {
                                        group.members.map((member: UserForHome, index: number) => (
                                            <div style={{ display: 'flex' }}>
                                                <p>{member.userName}</p>
                                                { index < group.members.length - 1 
                                                    && <p>,</p>
                                                }
                                            </div>
                                        ))
                                    }                    
                                </div>
                                <img className='enter-group-secret' style={{ width: 30, height: 30, alignSelf: 'center', paddingRight: 50 }} src={enterGroupSecret} onClick={() => handleScreenChange(group)} />
                            </div>
                            )
                        )
                    }
                </div>
            </div>
        )
    }

}