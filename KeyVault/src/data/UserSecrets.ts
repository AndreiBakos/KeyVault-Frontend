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

export interface GroupSecrets {
    id: number,
    title: string,
    secrets: Secret[],
    members: UserForHome[],
    owner: string
}