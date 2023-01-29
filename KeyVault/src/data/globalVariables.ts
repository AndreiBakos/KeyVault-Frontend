import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://localhost:5001/api',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

export enum Page {
    LogIn = 0,
    SignUp = 1,
    Home = 2
}

export enum SecretsPage {
    MySecrets = 0,
    GroupSecrets = 1
}

