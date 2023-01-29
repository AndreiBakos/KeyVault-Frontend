export default function NewSecretsScreen ({isNewSecretTriggered, createSecret, newSecretContent, setNewSecretContent}: any){
    return(         
        <div style={{ backgroundColor: '#363636' }}>
            <div style={{ display:'flex', flexDirection: 'row' }} className='create-secret-conatiner'>
                <label hidden={!isNewSecretTriggered} style={{ fontSize:  18, marginTop: 20, marginBottom: 20 }}>Enter Secret Content</label>
                <input hidden={!isNewSecretTriggered}  className='create-secret-content-input' type='text' value={newSecretContent} onChange={(e) => setNewSecretContent(e.target.value)} />
            </div>
            <button className='submit-new-secret' type='submit' onClick={() => createSecret()}>Create Secret</button>
        </div> 
    )
}