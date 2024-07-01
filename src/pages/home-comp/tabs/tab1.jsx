import CustomTabPanel from "./CustomTabPanel";
import DataPanelGroup from "./components/DataPanelGroup";
import PiePanel from "./components/PiePanel";
import { useSelector } from "react-redux";
import { getNameLocal } from "../../../util/getNameLocal";

export function Tab1(props) {
  const { value, index, ...other } = props;
  const selectedNeighbourhood = useSelector(
    (state) => state.selectedNeighbourhood.selectedNeighbourhoodStats
  );
  const neighborhoods_titles = useSelector(
    (state) => state.titles.graphGroup.neighbourhood
  );
  const local = useSelector((state) => state.uiSett.local);

  return (
    <CustomTabPanel value={value} index={index} {...other}>
      {selectedNeighbourhood && neighborhoods_titles && (
        <DataPanelGroup gridY={6}>
          {neighborhoods_titles
            .map((title, index) => {
              if (title["Type"] === "PiePanel")
                return (
                  <PiePanel
                    key={index}
                    size={title["Size"]}
                    name={getNameLocal(title["Name"], local)}
                    series={[
                      {
                        data:
                          title && title["Data"]
                            ? title["Data"].map((data, index) => ({
                                id: index,
                                value: selectedNeighbourhood[data["Title"]],
                                label: getNameLocal(data["Name"], local),
                              }))
                            : [],
                      },
                    ]}
                  />
                );
              return null;
            })
            .filter((el) => el !== null)}
        </DataPanelGroup>
      )}
    </CustomTabPanel>
  );
}
