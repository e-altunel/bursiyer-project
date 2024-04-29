import DataPanelElement from "./DataPanelElement";
import { PieChart } from "@mui/x-charts/PieChart";

export default function PiePanel(props) {
  const { size, style, series, ...other } = props;

  console.log(size ? size * 100 : 200);

  return (
    <DataPanelElement
      sizeX={size ? size : 1}
      sizeY={size ? size : 1}
      style={{ backgroundColor: "green", ...style }}
      {...other}
    >
      <PieChart
        series={series}
        slotProps={{
          legend: {
            hidden: true,
          },
        }}
        style={{
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          height: "100%",
          width: "100%",
        }}
      />
    </DataPanelElement>
  );
}
