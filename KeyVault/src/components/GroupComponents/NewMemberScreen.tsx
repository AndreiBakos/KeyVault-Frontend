import { UserForHomeSearch } from '../../data/UserSecrets';
import checkedBox from '../../assets/checked-box-logo.svg';
import uncheckedBox from '../../assets/unchecked-box-logo.svg';

export default function NewMemberScreen({ foundUsers, newUserName, noUserFoundErrorTrigger, addUsersToGroup, handleCheckBox}: any) {
    return(
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
    )
}