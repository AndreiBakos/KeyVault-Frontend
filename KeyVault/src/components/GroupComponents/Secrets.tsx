import { Secret } from "../../data/UserSecrets";
import deleteBtn from '../../assets/delete-icon.svg';


export default function Secrets ({ groupSecrets, removeSecret }: any){
    return(
        <>
            {
                groupSecrets.map((secret: Secret) => (
                    <div className='secrets-content' key={secret.secretId}>
                        <p className='secrets-values'>{secret.title}</p>
                        <p className='secrets-values'>{secret.content}</p>
                        <p className='secrets-values'>{secret.dateCreated}</p>
                        <img className='delete-secret-btn' src={deleteBtn} onClick={() => removeSecret(secret.secretId)} />
                    </div>
                    )
                )
            }
        </>
    )
}