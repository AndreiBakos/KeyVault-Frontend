import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://localhost:5001/api',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
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

