export interface Secret {
    id: number,
    title: string,
    content: string,
    dateCreated: string
}

export interface User {
    id: number,
    userName: string,
    email: string,
    password: string,    
}

export interface UserForHome {
    id: number,
    userName: string,
    email: string
}

export interface UserForCreation {
    userName: string,
    email: string,
    password: string
}

export interface UserForHomeSearch {
    id: number,
    userName: string,
    email: string,
    checked: boolean
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