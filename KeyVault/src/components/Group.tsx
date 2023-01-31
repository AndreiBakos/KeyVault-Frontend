import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { GroupSecretsData, GroupSecretsDataForCreation, Secret, UserForHome, UserForHomeSearch } from '../data/UserSecrets';
import { api } from '../data/globalVariables';
import createSign from '../assets/create-sign.svg';
import closeCreate from '../assets/close-create.svg';
import backToGroups from '../assets/back-to-groups.svg';
import searchUser from '../assets/search-logo.svg';
import NewMemberScreen from './GroupComponents/NewMemberScreen';
import NewSecretsScreen from './GroupComponents/NewSecretsScreen';
import Secrets from './GroupComponents/Secrets';
import '../Home.css'
import GroupMembers from './GroupComponents/GroupMembers';
import axios from 'axios';

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
    const [ newMembersPageTrigger, setNewMembersPageTrigger ] = useState(false);
    const [ groupMembers, setGroupMembers ] = useState<UserForHomeSearch[]>([]);
    const [ selectedMembers, setSelectedMembers ] = useState<string[]>([]);

    const handleScreenChanges = () => {
        if(isNewSecretTriggered) {
            return (
                <NewSecretsScreen 
                    isNewSecretTriggered={isNewSecretTriggered}
                    createSecret={createSecret} 
                    newSecretContent={newSecretContent}
                    setNewSecretContent={setNewSecretContent} />
            );
        }

        if(isNewMemberTriggered) {
            return (
                <NewMemberScreen 
                    foundUsers={foundUsers}
                    newUserName={newUserName}
                    noUserFoundErrorTrigger={noUserFoundErrorTrigger}
                    addUsersToGroup={addUsersToGroup}
                    handleCheckBox={handleCheckBox} />
            );
        }

        if(newMembersPageTrigger){
            return <GroupMembers 
                selectedMembers={selectedMembers}
                groupMembers={groupMembers}
                handleCheckBoxForMembers={handleCheckBoxForMembers}
                removeMembers={removeMembers} />
        }

        return (
            <Secrets 
                groupSecrets={groupSecrets}
                removeSecret={removeSecret} />
        );
    }

    const getGroupMembers = async() => {
        setNewMembersPageTrigger(!newMembersPageTrigger);
        const response = await api.get(`https://localhost:5001/api/groups/members?groupId=${currentGroup.groupId}`);

        const newMembers: UserForHomeSearch[] = response.data.map((member: UserForHome) => {return {...member, checked: true}});        

        setGroupMembers(newMembers);
    }

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

        const newGroupSecrets = groupSecrets.filter((groupSecrets: Secret) => groupSecrets.secretId !== secretId);
        setGroupSecrets(newGroupSecrets);
    }

    const removeMembers = async() => {        
        await api.delete(`https://localhost:5001/api/groups/members?ids=${selectedMembers}`);

        const newMembersList = currentGroup.members.filter((member) => selectedMembers.indexOf(member.id) === -1)
        setCurrentGroup({
            groupId: currentGroup.groupId,
            title: currentGroup.title,            
            members: newMembersList,
            owner: currentGroup.owner
        })
        setNewMembersPageTrigger(!newMembersPageTrigger);
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
    const handleCheckBoxForMembers = ( member: UserForHomeSearch ) => {   
        const newFoundMemberList = groupMembers.map((memberParam: UserForHomeSearch) => {
            if(memberParam.id === member.id){
                return {...memberParam, checked: !memberParam.checked}
            }
            return memberParam;
        });
        setGroupMembers(newFoundMemberList);
        
        const hasParamMember = selectedMembers.find((memberParam) => memberParam === member.id)
        if(hasParamMember === undefined) {
            setSelectedMembers((memberParam: string[]) => [...memberParam, member.id]);             
        }else {
            const newSelectedUserList = selectedMembers.filter((memberParam: string) => memberParam !== member.id)
            setSelectedMembers(newSelectedUserList);
        }
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
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '60%'}}>
                        <button className='manage-members-btn' type='submit' onClick={() => getGroupMembers()}>Manage Members</button>
                        <button className='delete-group-btn' type='submit' onClick={() => removeGroup()}>Delete Group</button>
                    </div>
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
                        handleScreenChanges()
                    }
                </div>                
            </div>
    )
}