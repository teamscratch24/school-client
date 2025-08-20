import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/admin', 
  timeout: 5000,                      
  headers: {
    'Content-Type': 'application/json',
     Authorization: `Bearer ${localStorage.token}`
  },
});

export default axiosInstance



