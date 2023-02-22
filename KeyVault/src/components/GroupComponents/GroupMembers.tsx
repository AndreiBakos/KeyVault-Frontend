import { UserForHomeSearch } from "../../data/UserSecrets";
import checkedBox from '../../assets/checked-box-logo.svg';
import uncheckedBox from '../../assets/unchecked-box-logo.svg';
import { useContext } from "react";
import { ContextComponent } from "../../Context";

export default function GroupMembers ({ currentGroup, selectedMembers, groupMembers, handleCheckBoxForMembers, removeMembers }: any){
    const contextComponent = useContext(ContextComponent);
    return(
     <>
        {
            groupMembers.map((member: UserForHomeSearch) => (
                <div className='secrets-content' key={member.id}>
                    <p className='secrets-values'>{member.userName}</p>
                    <p className='secrets-values'>{member.email}</p>                
                    {
                        contextComponent?.loggedInUser?.id === currentGroup.ownerId ?
                            member.id !== currentGroup.ownerId 
                            ?
                                <img className='delete-secret-btn' src={member.checked ? checkedBox : uncheckedBox} onClick={() => handleCheckBoxForMembers(member)} />
                            :
                                <p className='secrets-values'>OWNER</p>
                            :
                            <p></p>
                    }
                </div>
            ))
        }
        {
            currentGroup.ownerId === contextComponent?.loggedInUser?.id &&
            <button className='delete-group-btn' type='submit' onClick={() => removeMembers(selectedMembers)}>Remove Member</button>
        }
     </>
    )
}