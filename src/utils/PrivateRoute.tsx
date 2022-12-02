import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';



const PrivateRoute = ({children}:PropsWithChildren) => {
  let { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user == null) {
      navigate('/login')
    }
  }, [user, navigate])

  if (user == null) return null
  return <>{children}</>;
}

export default PrivateRoute;