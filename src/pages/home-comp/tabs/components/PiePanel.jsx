import DataPanelElement from "./DataPanelElement";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

export default function PiePanel(props) {
  const { size, style, series, ...other } = props;

  return (
    <DataPanelElement
      sizeX={size ? size : 1}
      sizeY={size ? size : 1}
      style={style}
      {...other}
    >
      <h1
        style={{
          gridRow: "1",
          gridColumn: "1",
          textAlign: "center",
          fontSize: "1.2em",
        }}
      >
        Title
      </h1>
      <Pie
        className="fixed-size"
        data={{
          labels: series[0].data.map((s) => s.label),
          datasets: [
            {
              data: series[0].data.map((s) => s.value),
            },
          ],
        }}
      />
    </DataPanelElement>
  );
}
