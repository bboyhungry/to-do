import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <button onClick={handleLogout}>
      Sign out
    </button>
  );
}

export default LogoutButton;