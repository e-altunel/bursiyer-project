import CustomTabPanel from "./CustomTabPanel";
import DataPanelGroup from "./components/DataPanelGroup";
import PiePanel from "./components/PiePanel";
import { useSelector } from "react-redux";

export function Tab1(props) {
  const { value, index, ...other } = props;
  const selectedNeighbourhood = useSelector(
    (state) => state.selectedNeighbourhood.selectedNeighbourhood
  );

  return (
    <CustomTabPanel value={value} index={index} {...other}>
      {selectedNeighbourhood && (
        <DataPanelGroup gridY={6}>
          <PiePanel
            size={2}
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: selectedNeighbourhood["KADIN_YUZD"],
                    label: "Kadın Yüzdesi",
                  },
                  {
                    id: 1,
                    value: selectedNeighbourhood["ERKEK_YUZD"],
                    label: "Erkek Yüzdesi",
                  },
                ],
              },
            ]}
          />
        </DataPanelGroup>
      )}
    </CustomTabPanel>
  );
}
