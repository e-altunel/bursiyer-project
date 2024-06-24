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
        backgroundColor: darkMode ? "var(--dark-bg-3)" : "var(--light-bg-3)",
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
              borderTopRightRadius: "0",
              borderBottomRightRadius: "0",
              borderRight: "none",
              height: "100%",
            }}
          >
            <Image
              src="https://cdn-icons-png.freepik.com/512/439/439842.png"
              alt="sun"
              width="25"
              height="25"
            />
          </CButton>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            height: `calc(100% - ${navbar_size}vh)`,
            paddingTop: "10px",
            paddingBottom: "10px",
            alignItems: "center",
          }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <CButton
              key={i}
              style={{
                marginRight: "0px",
                marginLeft: "auto",
                marginTop: "0px",
                marginBottom: "3px",
                borderTopRightRadius: "0",
                borderBottomRightRadius: "0",
                backgroundColor: darkMode
                  ? "var(--dark-bg)"
                  : "var(--light-bg)",
                borderColor: darkMode
                  ? "var(--light-bg-2)"
                  : "var(--dark-bg-2)",
                borderRight: "none",
              }}
            >
              <Image
                src="https://cdn-icons-png.freepik.com/512/439/439842.png"
                alt="sun"
                width={i % 2 === 0 ? "25" : "15"}
                height={i % 2 === 0 ? "25" : "15"}
              />
            </CButton>
          ))}
        </div>
      </div>
      <div
        style={{
          backgroundColor: darkMode ? "var(--dark-bg)" : "var(--light-bg)",
          height: "100%",
          width: leftBarOpen ? `${left_right_bar_size}vw` : "0",
          boxShadow: `inset -10px 0px 10px -4px ${
            darkMode ? "var(--dark-shadow)" : "var(--light-shadow)"
          }`,
        }}
      ></div>
    </div>
  );
}
