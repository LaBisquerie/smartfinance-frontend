import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { AiOutlinePoweroff } from 'react-icons/ai';
export interface TopPage {}


const TopPage: React.FunctionComponent<TopPage> = () => {
  const { logoutUser, user } = useAuth();
  const [username, setUsername] : any = useState<string>('');

  useEffect(() => {
    fetch(`http://localhost:8000/api/users/${user?.user_id}/`)
    .then(response => response.json())
    .then(res => setUsername(res))
    .catch(err => console.log(err))
  }, [])

  console.log(username);

  return (
    <div className="top-page">
      <span className="top-page__name">Bienvenue {username['first_name']}</span>
      <div className="top-page__right">
        <img className="top-page__icon img-fluid" src="https://i.pravatar.cc/45" alt='user_photo' loading="lazy" />
        <button className="top-page__logout" onClick={logoutUser}>
          <AiOutlinePoweroff className="top-page__logout-icon" />
        </button>
      </div>
    </div>
  );
}

export default TopPage;