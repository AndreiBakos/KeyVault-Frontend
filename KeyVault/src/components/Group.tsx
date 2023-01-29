import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { emptySecret, GroupSecretsData, GroupSecretsDataForCreation, Secret, SecretForCreation, UserForHome, UserForHomeSearch } from '../data/UserSecrets';
import createSign from '../assets/create-sign.svg';
import closeCreate from '../assets/close-create.svg';
import enterGroupSecret from '../assets/acces-group-secret.svg';
import backToGroups from '../assets/back-to-groups.svg';
import deleteBtn from '../assets/delete-icon.svg';
import searchUser from '../assets/search-logo.svg';
import checkedBox from '../assets/checked-box-logo.svg';
import uncheckedBox from '../assets/unchecked-box-logo.svg';
import '../Home.css'
import { api } from '../data/globalVariables';

interface GroupProps {
    currentGroup: GroupSecretsData,
    setCurrentGroup: Dispatch<SetStateAction<GroupSecretsData>>, 
    groupsList: GroupSecretsData[],
    setGroupsList: Dispatch<SetStateAction<GroupSecretsData[]>>,
    isGroupEntered: SetStateAction<boolean>,
    setIsGroupEntered: Dispatch<SetStateAction<boolean>>,
    loggedInUser: any
}


export default function( { loggedInUser, currentGroup, setCurrentGroup, groupsList, setGroupsList, isGroupEntered, setIsGroupEntered }: GroupProps ) {
    const [ isNewSecretTriggered, setIsNewSecretTriggered ] = useState<boolean>(false);
    const [ newSecretTitle, setNewSecretTitle ] = useState<string>('');
    const [ newSecretContent, setNewSecretContent ] = useState<string>('');
    const [ isNewMemberTriggered, setIsNewMemberTriggered ] = useState<boolean>(false);
    const [ foundUsers, setFoundUsers ] = useState<UserForHomeSearch[]>([]);
    const [ newUserName, setNewUserName ] = useState<string>('');
    const [ noUserFoundErrorTrigger, setNoUserFoundErrorTrigger ] = useState<string>('');
    const [ selectedUsersList, setSelectedUsersList ] = useState<UserForHome[]>([]);
    const [ groupSecrets, setGroupSecrets ] = useState<Secret[]>([]);

    const getGroupSecrets = async() => {
        const secrets:Secret[] = await (await api.get(`https://localhost:5001/api/groups/secrets?groupId=${currentGroup.groupId}`)).data;
        setGroupSecrets(secrets);
    }

    const createSecret = async () => {        
        const newGroupSecret: GroupSecretsDataForCreation = {
            groupId: currentGroup.groupId,
            secret: {
                title: newSecretTitle,
                content: newSecretContent,
                ownerId: loggedInUser.id
            }
        }
        
        const response: Secret = await (await api.post('https://localhost:5001/api/groups/secrets', newGroupSecret)).data
        setGroupSecrets((groupSecrets) => [...groupSecrets, response]);
        setNewSecretTitle('');
        setNewSecretContent('');
        setIsNewSecretTriggered(!isNewSecretTriggered);
    }

    const removeGroup = async() => {
        await api.delete(`https://localhost:5001/api/groups?groupId=${currentGroup.groupId}`);

        const newGroupsList = groupsList.filter((group: GroupSecretsData) => group.groupId !== currentGroup.groupId);
        setGroupsList(newGroupsList);
        setIsGroupEntered(!isGroupEntered)
    }

    const removeSecret = async(secretId: string) => {
        await api.delete(`https://localhost:5001/api/groups/secrets?secretId=${secretId}`);

        const newGroupSecrets = groupSecrets.filter((groupSecrets: Secret) => groupSecrets.id !== secretId);
        setGroupSecrets(newGroupSecrets);
    }

    const checkForUsers = async() => {
        const response = await api.get(`https://localhost:5001/api/users?userName=${newUserName}`);
        
        const users: UserForHome[] = response.data;
        const filteredUsers = users.filter((user) => currentGroup.members.filter((groupMember: UserForHome) => groupMember.id === user.id).length === 0 && user.userName !== currentGroup.owner);

        if(filteredUsers.length === 0){
            setNoUserFoundErrorTrigger('No users found');
            return;
        }

        const newUsers: UserForHomeSearch[] = filteredUsers.map((user: UserForHome) => {return {...user, checked: false}});        
        setFoundUsers(newUsers);
    }

    const handleCheckBox = ( user: UserForHomeSearch ) => {   
        const newFoundUsersList = foundUsers.map((userParam: UserForHomeSearch) => {
            if(userParam.id === user.id){
                return {...userParam, checked: !userParam.checked}
            }
            return userParam;
        })        
        setFoundUsers(newFoundUsersList);
        
        const hasParamUser = selectedUsersList.find((userParam) => userParam.id === user.id)
        if(hasParamUser === undefined) {
            setSelectedUsersList((userParam: UserForHome[]) => [...userParam, {
                id: user.id,
                userName: user.userName,
                email: user.email
            }]);             
        }else {
            const newSelectedUserList = selectedUsersList.filter((userParam: UserForHome) => userParam.id !== user.id)
            setSelectedUsersList(newSelectedUserList);
        }
    }

    const addUsersToGroup = async() => {
        const formatedSelectedUsersList: {groupId: string, memberId: string}[] = [];
        
        for(var i = 0; i < selectedUsersList.length; i++){
            formatedSelectedUsersList.push({
                groupId: currentGroup.groupId,
                memberId: selectedUsersList[i].id
            })
        }
        if(formatedSelectedUsersList.length !== 0){
            const response = await api.post('https://localhost:5001/api/groups/members', formatedSelectedUsersList);
            
            setCurrentGroup({
                groupId: currentGroup.groupId,
                title: currentGroup.title,            
                members: response.data.members,
                owner: currentGroup.owner
            })
            
            setSelectedUsersList([]);
            setFoundUsers([]);
            setNewUserName('');
            setIsNewMemberTriggered(!isNewMemberTriggered)
        }
    }

    useEffect(() => {
        getGroupSecrets()
    },[])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img className='enter-group-secret' style={{ width: 40, height: 40 }} src={backToGroups} onClick={() => setIsGroupEntered(!isGroupEntered)} />
                        <p style={{ fontWeight: 'bolder', fontSize: 30, marginLeft: 20, paddingTop: 3 }}>{currentGroup.title}</p>
                    </div>
                    <button className='delete-group-btn' type='submit' onClick={() => removeGroup()}>Delete Group</button>
                </div>
                <div style={{ justifyContent: 'space-between', alignItems: 'center' }} className='create-secret-conatiner'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img hidden={isNewSecretTriggered} className='create-secret-btn' src={isNewMemberTriggered ? closeCreate : createSign} onClick={() => {setIsNewMemberTriggered(!isNewMemberTriggered); setNewUserName('')}} />
                        <label hidden={isNewSecretTriggered} style={{ paddingLeft: 15 }}>Add Member</label>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '70%' }}>
                        {
                            isNewMemberTriggered
                            ?
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                        <input hidden={!isNewMemberTriggered} className='create-secret-input' type='text' value={newUserName} onChange={(e) => {setNewUserName(e.target.value); setNoUserFoundErrorTrigger('')}} />
                                        <img className='enter-group-secret' style={{ width: 35, height: 35, paddingLeft: 15 }} src={searchUser} onClick={() => checkForUsers()} />
                                    </div>        
                                </>
                            :
                                <>                
                                    <label hidden={!isNewSecretTriggered}>Enter Secret Title</label>
                                    <input hidden={!isNewSecretTriggered}  className='create-secret-input' type='text' value={newSecretTitle} onChange={(e) => setNewSecretTitle(e.target.value)} />
                                </>
                        }
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label hidden={isNewMemberTriggered} style={{ paddingRight: 15 }}>Create Secret</label>
                        <img hidden={isNewMemberTriggered} className='create-secret-btn' src={isNewSecretTriggered ? closeCreate : createSign} onClick={() => setIsNewSecretTriggered(!isNewSecretTriggered)} />
                    </div>
                </div>
                <div className='secrets-content-container'>
                    {      
                        isNewSecretTriggered                        
                        ? 
                        <div style={{ backgroundColor: '#363636' }}>
                            <div style={{ display:'flex', flexDirection: 'row' }} className='create-secret-conatiner'>
                                <label hidden={!isNewSecretTriggered} style={{ fontSize:  18, marginTop: 20, marginBottom: 20 }}>Enter Secret Content</label>
                                <input hidden={!isNewSecretTriggered}  className='create-secret-content-input' type='text' value={newSecretContent} onChange={(e) => setNewSecretContent(e.target.value)} />
                            </div>
                            <button className='submit-new-secret' type='submit' onClick={() => createSecret()}>Create Secret</button>
                        </div> 
                        : 
                        isNewMemberTriggered                        
                        ? 
                        <div style={{ backgroundColor: '#363636' }}>
                            <div style={{ display:'flex', flexDirection: 'column' }} className='create-secret-conatiner'>
                                {
                                    foundUsers.length === 0 && newUserName.length > 0
                                    ?
                                        <label>{noUserFoundErrorTrigger}</label>
                                    :
                                    foundUsers.map((user: UserForHomeSearch) => (
                                        <div className='secrets-content' key={user.id}>
                                            <p className='secrets-values'>{user.userName}</p>
                                            <p className='secrets-values'>{user.email}</p>
                                            <img className='delete-secret-btn' src={user.checked ? checkedBox : uncheckedBox} onClick={() => handleCheckBox(user)} />
                                        </div>
                                        )
                                    )
                                }
                            </div>
                            <button className='submit-new-secret' type='submit' onClick={() => addUsersToGroup()}>Add User</button>
                        </div> 
                        :       
                        groupSecrets.map((secret: Secret) => (
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