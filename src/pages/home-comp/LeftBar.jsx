import { useSelector, useDispatch } from "react-redux";
import { setLeftBarOpen } from "../../reducers/uiSett";
import { Image } from "react-bootstrap";
import CButton from "../custom-comp/CButton";

export default function LeftBar() {
  const leftBarOpen = useSelector((state) => state.uiSett.leftBarOpen);
  const dispatch = useDispatch();

  const left_left_bar_size = useSelector(
    (state) => state.uiSett.left_left_bar_size
  );
  const left_right_bar_size = useSelector(
    (state) => state.uiSett.left_right_bar_size
  );
  const navbar_size = useSelector((state) => state.uiSett.navbar_size);
  const darkMode = useSelector((state) => state.uiSett.darkMode);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: leftBarOpen
          ? `${left_left_bar_size + left_right_bar_size}vw`
          : `${left_left_bar_size}vw`,
        padding: "0",
        margin: "0",
        height: "100%",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${left_left_bar_size}vw`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "right",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "right",
            height: `${navbar_size}vh`,
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <CButton
            onClick={() => dispatch(setLeftBarOpen(!leftBarOpen))}
            style={{
              marginRight: "0px",
              marginLeft: "auto",
              marginTop: "auto",
              marginBottom: "auto",
              height: "100%",
            }}
          >
            <Image
              src="https://cdn-icons-png.freepik.com/512/439/439842.png"
              alt="sun"
              width="20"
              height="20"
            />
          </CButton>
        </div>
      </div>
      <div
        style={{
          backgroundColor: darkMode ? "var(--dark-bg-2)" : "var(--light-bg-2)",
          height: "100%",
          width: leftBarOpen ? `${left_right_bar_size}vw` : "0",
        }}
      ></div>
    </div>
  );
}
