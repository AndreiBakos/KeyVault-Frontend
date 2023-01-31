export interface Secret {
    secretId: string,
    title: string,
    content: string,
    dateCreated: string
    ownerId: string
}

export interface SecretForCreation {
    title: string,
    content: string,
    ownerId: string
}

export interface User {
    id: string,
    userName: string,
    email: string,
    password: string,    
}

export interface UserForHome {
    id: string,
    userName: string,
    email: string
}

export interface UserForCreation {
    userName: string,
    email: string,
    password: string
}

export interface UserForHomeSearch {
    id: string,
    userName: string,
    email: string,
    checked: boolean
}

export interface GroupSecretsData {
    groupId: string,
    title: string,
    members: UserForHome[],
    owner: string
}

export interface GroupSecretsDataForCreation {
    groupId: string,
    secret: SecretForCreation
}

export const emptySecret: Secret = {
    secretId: '',
    title: '',
    content: '',
    dateCreated: '',
    ownerId: ''
}

export const emptyGroup: GroupSecretsData = {
    groupId: '',
    title: '',
    members: [],
    owner: ''
}