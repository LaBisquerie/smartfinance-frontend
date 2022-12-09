import { createContext, useState, useEffect, PropsWithChildren } from "react"
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"

export type User = {
  user_id: string;
  exp: number;
  first_name: string;
  last_name: string;
}

export type Token = {
  access: string;
  refresh: string;
}

type AuthContextType = {
  user: User|null;
  setUser: (user:User|null)=>void;
  authTokens : Token|null;
  setAuthTokens : (token:Token|null)=>void;
  registerUser : (username : string, password : string, password2 : string)=>Promise<void>;
  loginUser : (username : string, password : string)=>Promise<void>;
  logoutUser : ()=>void;
}

const AuthContext = createContext<AuthContextType>(null!)

export default AuthContext;

export const AuthProvider = ({ children } : PropsWithChildren<unknown>) => {
  const [authTokens, setAuthTokens] = useState<AuthContextType['authTokens']>(() =>
    localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens") || '{}')
    : null
  );

  const [user, setUser] = useState<AuthContextType['user']>(() =>
    localStorage.getItem("authTokens")
    ? jwt_decode(localStorage.getItem("authTokens") || '{}')
    : null
  );

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (email : string, password : string) => {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate('/');
    } else {
      console.log("Something went wrong !");
    }
  };

  const registerUser = async (email : string, password : string, password2 : string) => {
    const response = await fetch("http://127.0.0.1:8000/api/accounts/register/", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password,
        password2,
      })
    });

    if (response.status === 201) {
      navigate('/login');
    } else {
      alert('Something went wrong !');
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate('/');
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser
  };


  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);