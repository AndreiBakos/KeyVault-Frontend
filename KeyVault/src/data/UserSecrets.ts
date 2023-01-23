export interface Secret {
    id: number,
    title: string,
    content: string,
    dateCreated: string
}

export interface User {
    id: number,
    userName: string,
    password: string,    
}

export interface UserForHome {
    id: number,
    userName: string
}

export interface GroupSecretsData {
    id: number,
    title: string,
    secrets: Secret[],
    members: UserForHome[],
    owner: string
}

export const emptySecret: Secret = {
    id: 0,
    title: '',
    content: '',
    dateCreated: ''
}

export const emptyGroup: GroupSecretsData = {
    id: 0,
    title: '',
    secrets: [],
    members: [],
    owner: ''
}