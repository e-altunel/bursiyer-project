import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function Profile() {
  const navigate = useNavigate();
  const { user } = UserAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>{user.email}</h1>
    </div>
  );
}
