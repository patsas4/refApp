import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import axios from "axios";
import { dateInterceptor, unauthorizedInterceptor } from './scripts/responseIntercepters.ts';

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
}


axios.interceptors.response.use(response => response, unauthorizedInterceptor);

createRoot(document.getElementById('root')!).render(
    <App />
)
