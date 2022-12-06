import { useAuth } from "../context/AuthContext";

export interface TopPage {}

const TopPage: React.FunctionComponent<TopPage> = () => {
  const { logoutUser } = useAuth();

  return (
    <div className="top-page">
      coucou
      <button onClick={logoutUser}>Se déconnecter</button>
    </div>
  );
}

export default TopPage;