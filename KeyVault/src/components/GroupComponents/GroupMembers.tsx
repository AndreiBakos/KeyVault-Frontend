import { useEffect, useState } from "react";
import { api } from "../../data/globalVariables";
import { UserForHome, UserForHomeSearch } from "../../data/UserSecrets";
import checkedBox from '../../assets/checked-box-logo.svg';
import uncheckedBox from '../../assets/unchecked-box-logo.svg';

export default function GroupMembers ({ selectedMembers, groupMembers, handleCheckBoxForMembers, removeMembers }: any){
    return(
     <>
        {
            groupMembers.map((member: UserForHomeSearch) => (
                <div className='secrets-content' key={member.id}>
                    <p className='secrets-values'>{member.userName}</p>
                    <p className='secrets-values'>{member.email}</p>                
                    <img className='delete-secret-btn' src={member.checked ? checkedBox : uncheckedBox} onClick={() => handleCheckBoxForMembers(member)} />
                </div>
            ))
        }
            <button className='delete-group-btn' type='submit' onClick={() => removeMembers(selectedMembers)}>Remove Member</button>
     </>
    )
}