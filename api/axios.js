import axios from 'axios';

let token;
if (typeof window !== 'undefined') {
    token = localStorage.getItem('h-token');
  }

export default axios.create({
    baseURL: '/',
    headers: {
        Authorization: `Bearer ${token}`
    }
});