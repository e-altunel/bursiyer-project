import CustomTabPanel from "./CustomTabPanel";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";

export function MarkerTab(props) {
  const { value, index, ...other } = props;
  const selectedMarker = useSelector(
    (state) => state.selectedMarker.selectedMarker
  );

  return (
    <CustomTabPanel value={value} index={index} {...other}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {selectedMarker &&
            Object.entries(selectedMarker)
              .sort((a, b) => a[0].localeCompare(b[0]))
              .map((item, index) => {
                const key = item[0];
                const value = item[1];
                if (typeof value !== "string" && typeof value !== "number")
                  return null;
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td
                      style={{
                        textAlign: "left",
                      }}
                    >
                      {key}
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                      }}
                    >
                      {value}
                    </td>
                  </tr>
                );
              })
              .filter((n) => n !== null)}
        </tbody>
      </Table>
    </CustomTabPanel>
  );
}
