import { GroupSecretsData } from "../UserSecrets";


export const groupSecretsData: GroupSecretsData[] = [
    {
        groupId: '1',
        title: 'IT Support',
        members: [
            {
                id: '1',
                userName: 'AndreiTest',
                email: 'andrei@test.test'
            },
            {
                id: '2',
                userName: 'MihaiTest',
                email: 'mihai@test.test'
            }
        ],
        ownerId: 'AnaTest'

    },
    {
        groupId: '2',
        title: 'Developers',
        members: [
            {
                id: '1',
                userName: 'AndreiTest',
                email: 'andrei@test.test'
            },
            {
                id: '2',
                userName: 'MihaiTest',
                email: 'mihai@test.test'
            },
            {
                id: '3',
                userName: 'IoanTest',
                email: 'ioan@test.test'
            }
        ],
        ownerId: 'AndreiTest'

    }
]