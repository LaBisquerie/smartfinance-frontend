import axios from 'axios'
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { useContext } from 'react'
import AuthContext, { useAuth, User } from '../context/AuthContext';

const baseUrl : string = "http://127.0.0.1:8000/api";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useAuth();

  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: { Authorization: `Bearer ${authTokens?.access}` }
  });

  axiosInstance.interceptors.request.use(async req => {
    const user : User = jwt_decode(authTokens?.access ?? '');
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const response = await axios.post(`${baseUrl}/token/refresh/`, {
      refresh: authTokens?.refresh
    });

    localStorage.setItem("authTokens", JSON.stringify(response.data));

    setAuthTokens(response.data);
    setUser(jwt_decode(response.data.access));

    if(req.headers) {
      req.headers.Authorization = `Bearer ${response.data.access}`;
    }

    return req;
  });

  return axiosInstance;
}

export default useAxios;