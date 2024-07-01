import { useSelector, useDispatch } from "react-redux";
import { setLeftBarOpen } from "../../reducers/uiSett";
import { Image } from "react-bootstrap";
import CButton from "../custom-comp/CButton";
import {
  setSelectedGroupIndex,
  setSelectedTitles,
} from "../../reducers/titles";

export default function LeftBar() {
  const leftBarOpen = useSelector((state) => state.uiSett.leftBarOpen);
  const dispatch = useDispatch();

  const left_left_bar_size = useSelector(
    (state) => state.uiSett.leftBar.leftBarSize
  );
  const left_right_bar_size = useSelector(
    (state) => state.uiSett.leftBar.rightBarSize
  );
  const navbar_size = useSelector((state) => state.uiSett.navbar.size);
  const navbar_padding = useSelector((state) => state.uiSett.navbar.padding);
  const darkMode = useSelector((state) => state.uiSett.darkMode);
  const title_group = useSelector((state) => state.titles.title_group);
  const selectedGroupIndex = useSelector(
    (state) => state.titles.selectedGroupIndex
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: leftBarOpen
          ? `calc(${left_left_bar_size} + ${left_right_bar_size})`
          : left_left_bar_size,
        padding: "0",
        margin: "0",
        height: "100%",
        backgroundColor: darkMode ? "var(--dark-bg-3)" : "var(--light-bg-3)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: left_left_bar_size,
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
            height: navbar_size,
            paddingTop: navbar_padding,
            paddingBottom: navbar_padding,
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
              height: `calc(${navbar_size} - 2 * ${navbar_padding})`,
              width: `calc(${left_left_bar_size} - ${navbar_padding})`,
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
        <div
          style={{
            height: navbar_size,
          }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            height: `calc(100% - ${navbar_size}vh)`,
            paddingTop: navbar_padding,
            paddingBottom: navbar_padding,
            alignItems: "center",
          }}
        >
          {title_group &&
            title_group.map((title, i) => (
              <>
                <CButton
                  key={i}
                  style={{
                    marginRight: "0px",
                    marginLeft: "auto",
                    marginTop: "0px",
                    marginBottom: navbar_padding,
                    borderTopRightRadius: "0",
                    borderBottomRightRadius: "0",
                    borderRight: "none",
                    width: `calc(${left_left_bar_size} - 2 * ${navbar_padding})`,
                    height: `calc(${navbar_size} - 2 * ${navbar_padding})`,
                  }}
                  active={
                    selectedGroupIndex[0] === i &&
                    selectedGroupIndex[1] === null
                  }
                  onClick={() => {
                    dispatch(setSelectedGroupIndex([i, null]));
                    if (title["SelectedTitles"] === "*") {
                      dispatch(setSelectedTitles("*"));
                      return;
                    }
                    var selectedTitles = [];
                    if (title["SelectedTitles"] !== undefined) {
                      selectedTitles = title["SelectedTitles"];
                    }
                    if (title["Subtitles"] !== undefined) {
                      selectedTitles = selectedTitles.concat(
                        title["Subtitles"]
                          .map((subTitle) => {
                            if (subTitle["SelectedTitles"] !== undefined) {
                              return subTitle["SelectedTitles"];
                            }
                            return null;
                          })
                          .flat(Infinity)
                          .filter((n) => n !== null)
                      );
                    }
                    dispatch(setSelectedTitles(selectedTitles));
                  }}
                >
                  <Image src={title["Icon"]} alt="sun" width="20" height="20" />
                </CButton>
                {title["Subtitles"] &&
                  title["Subtitles"].map((subTitle, j) => (
                    <CButton
                      key={j}
                      style={{
                        marginRight: "0px",
                        marginLeft: "auto",
                        marginTop: "0px",
                        marginBottom: "3px",
                        borderTopRightRadius: "0",
                        borderBottomRightRadius: "0",
                        borderRight: "none",
                        width: `calc(${left_left_bar_size} - 3 * ${navbar_padding})`,
                        height: `calc(${navbar_size} - 3 * ${navbar_padding})`,
                      }}
                      active={
                        selectedGroupIndex[0] === i &&
                        selectedGroupIndex[1] === j
                      }
                      onClick={() => {
                        dispatch(setSelectedTitles(subTitle["SelectedTitles"]));
                        dispatch(setSelectedGroupIndex([i, j]));
                      }}
                    >
                      <Image
                        src={subTitle["Icon"]}
                        alt="sun"
                        width="15"
                        height="15"
                      />
                    </CButton>
                  ))}
              </>
            ))}
        </div>
      </div>
      <div
        style={{
          height: navbar_size,
        }}
      ></div>
      {leftBarOpen && (
        <div
          style={{
            backgroundColor: darkMode ? "var(--dark-bg)" : "var(--light-bg)",
            height: "100%",
            width: leftBarOpen ? left_right_bar_size : "0",
            boxShadow: `inset -10px 0px 10px -4px ${
              darkMode ? "var(--dark-shadow)" : "var(--light-shadow)"
            }`,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
              height: navbar_size,
              paddingTop: navbar_padding,
              paddingBottom: navbar_padding,
            }}
          >
            <CButton
              onClick={() => dispatch(setLeftBarOpen(!leftBarOpen))}
              style={{
                marginRight: "auto",
                marginLeft: "0px",
                marginTop: "auto",
                marginBottom: "auto",
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",
                borderLeft: "none",
                height: `calc(${navbar_size} - 2 * ${navbar_padding})`,
                width: `calc(${left_right_bar_size} - ${navbar_padding})`,
              }}
            >
              Menu
            </CButton>
          </div>
          <div
            style={{
              height: navbar_size,
            }}
          ></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
              height: `calc(100% - ${navbar_size}vh)`,
              paddingTop: navbar_padding,
              paddingBottom: navbar_padding,
              alignItems: "center",
            }}
          >
            {title_group &&
              title_group.map((title, i) => (
                <>
                  <CButton
                    key={i}
                    style={{
                      marginRight: "auto",
                      marginLeft: "0px",
                      marginTop: "0px",
                      marginBottom: navbar_padding,
                      borderTopLeftRadius: "0",
                      borderBottomLeftRadius: "0",
                      borderLeft: "none",
                      width: `calc(${left_right_bar_size} - 2 * ${navbar_padding})`,
                      height: `calc(${navbar_size} - 2 * ${navbar_padding})`,
                    }}
                    active={
                      selectedGroupIndex[0] === i &&
                      selectedGroupIndex[1] === null
                    }
                    onClick={() => {
                      dispatch(setSelectedGroupIndex([i, null]));
                      if (title["SelectedTitles"] === "*") {
                        dispatch(setSelectedTitles("*"));
                        return;
                      }
                      var selectedTitles = [];
                      if (title["SelectedTitles"] !== undefined) {
                        selectedTitles = title["SelectedTitles"];
                      }
                      if (title["Subtitles"] !== undefined) {
                        selectedTitles = selectedTitles.concat(
                          title["Subtitles"]
                            .map((subTitle) => {
                              if (subTitle["SelectedTitles"] !== undefined) {
                                return subTitle["SelectedTitles"];
                              }
                              return null;
                            })
                            .flat(Infinity)
                            .filter((n) => n !== null)
                        );
                      }
                      dispatch(setSelectedTitles(selectedTitles));
                    }}
                  >
                    {title["Name"]}
                  </CButton>
                  {title["Subtitles"] &&
                    title["Subtitles"].map((subTitle, j) => (
                      <CButton
                        key={j}
                        style={{
                          marginRight: "auto",
                          marginLeft: "0px",
                          marginTop: "0px",
                          marginBottom: "3px",
                          borderTopLeftRadius: "0",
                          borderBottomLeftRadius: "0",
                          borderLeft: "none",
                          width: `calc(${left_right_bar_size} - 3 * ${navbar_padding})`,
                          height: `calc(${navbar_size} - 3 * ${navbar_padding})`,
                        }}
                        active={
                          selectedGroupIndex[0] === i &&
                          selectedGroupIndex[1] === j
                        }
                        onClick={() => {
                          dispatch(
                            setSelectedTitles(subTitle["SelectedTitles"])
                          );
                          dispatch(setSelectedGroupIndex([i, j]));
                        }}
                      >
                        {subTitle["Name"]}
                      </CButton>
                    ))}
                </>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
