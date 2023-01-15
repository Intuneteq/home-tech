import axios from 'axios';

const token = localStorage.getItem('h-token');

export default axios.create({
    baseURL: 'api',
    headers: {
        Authorization: `Bearer ${token}`
    }
});