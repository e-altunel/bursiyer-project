import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function CButton(props) {
  const { variant, style, children, active, ...other } = props;
  const darkMode = useSelector((state) => state.uiSett.darkMode);

  return (
    <Button
      variant={
        variant
          ? variant
          : darkMode
          ? active
            ? "light"
            : "outline-light"
          : active
          ? "dark"
          : "outline-dark"
      }
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "5px",
        ...style,
      }}
      {...other}
    >
      {children}
    </Button>
  );
}
