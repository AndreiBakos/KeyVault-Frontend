import { GroupSecretsData } from "../UserSecrets";


export const groupSecretsData: GroupSecretsData[] = [
    {
        id: 1,
        title: 'IT Support',
        secrets: [
            {
                id: 1,
                title: 'Group Secret1',
                content: 'Hi this is my group secret',
                dateCreated: '22/07/1999'
            },
            {
                id: 2,
                title: 'Group Secret2',
                content: 'Hi this is my second group secret',
                dateCreated: '22/07/2015'
            }
        ],
        members: [
            {
                id: 1,
                userName: 'AndreiTest'
            },
            {
                id: 2,
                userName: 'MihaiTest'
            }
        ],
        owner: 'AnaTest'

    },
    {
        id: 2,
        title: 'Developers',
        secrets: [
            {
                id: 1,
                title: 'Group Secret1 for devs',
                content: 'Hi this is my group secret',
                dateCreated: '22/07/1999'
            },
            {
                id: 2,
                title: 'Group Secret2 for devs',
                content: 'Hi this is my second group secret',
                dateCreated: '22/07/2015'
            }
        ],
        members: [
            {
                id: 1,
                userName: 'AndreiTest'
            },
            {
                id: 2,
                userName: 'MihaiTest'
            },
            {
                id: 3,
                userName: 'IoanTest'
            }
        ],
        owner: 'AndreiTest'

    }
]