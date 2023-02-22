import { useContext, useEffect, useState } from 'react';
import { api, SecretsPage } from '../data/globalVariables';
import { emptyGroup, GroupSecretsData, UserForHome } from '../data/UserSecrets';
import createSign from '../assets/create-sign.svg';
import closeCreate from '../assets/close-create.svg';
import enterGroupSecret from '../assets/acces-group-secret.svg';
import SubmitGroupName from '../assets/check-logo.svg';
import '../Home.css'
import Group from './Group';
import { ContextComponent } from '../Context';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';

export default function GroupSecrets() {
    const contextComponent = useContext(ContextComponent);
    const navigate = useNavigate();
    const [ isNewSecretTriggered, setIsNewSecretTriggered ] = useState<boolean>(false);
    const [ currentGroup, setCurrentGroup ] = useState<GroupSecretsData>(emptyGroup);
    const [ newGroupTitle, setNewGroupTitle ] = useState<string>('');
    const [ groupsList, setGroupsList ] = useState<GroupSecretsData[]>([]);

    const createNewGroup = async() => {
        try {        
            const response = await api.post('https://localhost:5001/api/groups', {
                title: newGroupTitle,
                ownerId: contextComponent?.loggedInUser?.id
            })
    
            const newGroup: GroupSecretsData = response.data;
            setGroupsList((groups: GroupSecretsData[]) => [newGroup, ...groups]);
            setNewGroupTitle('');
            setIsNewSecretTriggered(!isNewSecretTriggered);
        } catch (error: any) {
            if(error.response.status === 401) {
                alert('Your session has expired! Log in again to continue');
            } else {
                alert('Something went wrong! Try to log in again');
            }
            localStorage.removeItem('token');
            localStorage.removeItem('loggedInUser');
            navigate('/')
        }        
    }
    
    const getGroups = async() => {
        try {
            const user = localStorage.getItem('loggedInUser');
            if(user !== null) {
                const data: UserForHome = JSON.parse(user);
                contextComponent?.setLoggedInUser(data);
                const groups = await api.get(`https://localhost:5001/api/groups?userId=${data.id}`);
                setGroupsList(groups.data);
            }else{
                navigate('/');
            }            
        } catch (error: any) {
            if(error.response.status === 401) {
                alert('Your session has expired! Log in again to continue');
            } else {
                alert('Something went wrong! Try to log in again');
            }
            localStorage.removeItem('token');
            localStorage.removeItem('loggedInUser');
            navigate('/')
        }
    }

    useEffect(() => {
        getGroups();
    }, [])

    return (
        <div>
            <Header currentPage={SecretsPage.GroupSecrets} />
            <div style={{ justifyContent: !isNewSecretTriggered ? 'flex-end' : 'space-between' }} className='create-secret-conatiner'>
                <label hidden={!isNewSecretTriggered} >Enter Group Name</label>
                <div style={{ display: 'flex', width: '80%', justifyContent: 'center' }}>
                    <input style={{ marginRight: newGroupTitle.length === 0 ? 50 : 0 }} hidden={!isNewSecretTriggered} className='create-secret-input' type='text' value={newGroupTitle} onChange={(e) => setNewGroupTitle(e.target.value)} />
                    <img hidden={newGroupTitle.length === 0} className='create-secret-btn' style={{ marginLeft: 20 }} src={SubmitGroupName} onClick={() => createNewGroup()} />            
                </div>                       
                <img className='create-secret-btn' src={isNewSecretTriggered ? closeCreate : createSign} onClick={() => { setIsNewSecretTriggered(!isNewSecretTriggered); setNewGroupTitle('')}} />
            </div>
            <div className='secrets-content-container'>
                {
                    groupsList.map((group: GroupSecretsData, index: number) => (
                        <div className='group-secrets-content' key={group.groupId}>
                            <p className='secrets-values'>{group.title}</p>
                            <p className='secrets-values'>Owner: {group.members.filter((m: UserForHome) => m.id === group.ownerId)[0]?.userName}</p>                                                    
                            <div style={{ display: 'flex', alignItems: 'center', paddingRight: 20 }}>                                    
                                <p style={{ fontWeight: 'bolder', marginRight: 12 }}>{ group.members.length <= 1 ? 'No other members': 'Members:'}</p>
                                {                        
                                    group.members.length > 1 &&                
                                    group.members.map((member: UserForHome, index: number) => (
                                        <div style={{ display: 'flex' }} key={member.id}>
                                            <p>{member.userName}</p>
                                            { index < group.members.length - 1 
                                                && <p>,</p>
                                            }
                                        </div>
                                    ))
                                }                    
                            </div>
                            <Link className='enter-group-secret' style={{ alignSelf: 'center' }} to={`${group.groupId}`}>
                                <img style={{ width: 30, height: 30, alignSelf: 'center', paddingRight: 50 }} src={enterGroupSecret} />
                            </Link>
                        </div>
                        )
                    )
                }
            </div>
        </div>
    )
}