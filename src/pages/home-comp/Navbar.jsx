import { Box } from "@mui/material";
import { ButtonGroup } from "react-bootstrap";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setDarkMode } from "../../reducers/uiSett";
import { Image } from "react-bootstrap";
import CButton from "../custom-comp/CButton";

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
  //const dispatch = useDispatch();
  //const navbar_size = useSelector((state) => state.uiSett.navbar.size);
  //const navbar_padding = useSelector((state) => state.uiSett.navbar.padding);

  return (
    <Box
      className="navbar-custom"
      style={{
        backgroundColor: darkMode ? "var(--dark-bg)" : "var(--light-bg)",
      }}
    >
      {/*
      <CButton
			style={{
				width: `calc(${navbar_size} - 2 * ${navbar_padding})`,
        }}
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
						</CButton>
						*/}
      <div></div>
      <ButtonGroup>
        <CButton onClick={handleProfile}>Profile</CButton>
        <CButton onClick={handleLogout}>Logout</CButton>
      </ButtonGroup>
    </Box>
  );
}
