import CustomTabPanel from "./CustomTabPanel";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { CheckMark, CrossMark } from "../../../simple-comp/boolean";
import { useEffect } from "react";

export function MarkerTab(props) {
  const { value, index, ...other } = props;
  const selectedMarker = useSelector(
    (state) => state.selectedMarker.selectedMarker
  );
  const darkMode = useSelector((state) => state.uiSett.darkMode);
  const titles = useSelector((state) => state.titles.titles);
  const selectedTitles = useSelector((state) => state.titles.selectedTitles);

  return (
    <CustomTabPanel value={value} index={index} {...other}>
      <Table striped bordered hover variant={darkMode ? "dark" : "light"}>
        <thead>
          <tr>
            <th>#</th>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {selectedMarker &&
            titles &&
            selectedTitles &&
            (selectedTitles === "*"
              ? Array.from(Object.keys(selectedMarker)).map((key, index) => {
                  const value = selectedMarker[key];
                  if (typeof value !== "string" && typeof value !== "number")
                    return null;
                  const header_info = get_info_from_key(key, titles);
                  return (
                    <tr key={index}>
                      <td>{index}</td>
                      <td
                        style={{
                          textAlign: "left",
                        }}
                      >
                        {header_info.description.tr}
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                        }}
                      >
                        {show_value(value, header_info.type)}
                      </td>
                    </tr>
                  );
                })
              : selectedTitles
                  .map((item, index) => {
                    const key = item;
                    const value = selectedMarker[key];
                    if (typeof value !== "string" && typeof value !== "number")
                      return null;
                    const header_info = get_info_from_key(key, titles);
                    return (
                      <tr key={index}>
                        <td>{index}</td>
                        <td
                          style={{
                            textAlign: "left",
                          }}
                        >
                          {header_info.description.tr}
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                          }}
                        >
                          {show_value(value, header_info.type)}
                        </td>
                      </tr>
                    );
                  })
                  .filter((n) => n !== null))}
        </tbody>
      </Table>
    </CustomTabPanel>
  );
}

function get_info_from_key(key, titles) {
  for (const title of titles) {
    if (title.name === key) {
      return title;
    }
  }
  return key;
}

function show_value(value, type) {
  if (type === "BOOLEAN") {
    return value ? <CheckMark /> : <CrossMark />;
  }
  if (type === "REAL") {
    return value.toFixed(2);
  }
  return value;
}
