import { Box } from "@mui/material";
import { ButtonGroup, Button } from "react-bootstrap";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout } = UserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout().then(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <Box className="navbar">
      <ButtonGroup className="navbar-group">
        <Button variant="primary" onClick={handleProfile}>
          Profile
        </Button>
        <Button variant="primary" onClick={handleLogout}>
          Logout
        </Button>
      </ButtonGroup>
    </Box>
  );
}
