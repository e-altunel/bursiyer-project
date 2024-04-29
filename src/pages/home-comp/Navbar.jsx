import { Box } from "@mui/material";
import { ButtonGroup, Button } from "react-bootstrap";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setDarkMode } from "../../reducers/uiSett";
import { Image } from "react-bootstrap";

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
  const darkMode = useSelector((state) => state.uiSett.darkMode);
  const dispatch = useDispatch();

  return (
    <Box
      className={`navbar-custom ${
        darkMode ? "dark" : "light"
      }-simple-background`}
    >
      <Button
        variant={darkMode ? "outline-light" : "outline-dark"}
        onClick={() => dispatch(setDarkMode(!darkMode))}
      >
        {darkMode ? (
          <Image
            src="https://cdn-icons-png.freepik.com/512/439/439842.png"
            alt="sun"
            width="20"
            height="20"
          />
        ) : (
          <Image
            src="https://img.icons8.com/ios/452/moon-symbol.png"
            alt="moon"
            width="20"
            height="20"
          />
        )}
      </Button>
      <ButtonGroup>
        <Button
          variant={darkMode ? "outline-light" : "outline-dark"}
          onClick={handleProfile}
        >
          Profile
        </Button>
        <Button
          variant={darkMode ? "outline-light" : "outline-dark"}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </ButtonGroup>
    </Box>
  );
}
