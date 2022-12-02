import { useAuth } from "../context/AuthContext";

export interface TopPage {}

const TopPage: React.FunctionComponent<TopPage> = () => {
  const { logoutUser } = useAuth();

  return (
    <div>
      coucou
      <button onClick={logoutUser}>Se déconnecter</button>
    </div>
  );
}

export default TopPage;