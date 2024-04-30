import DataPanelElement from "./DataPanelElement";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { light_colorArray } from "./ChartColors";

export default function PiePanel(props) {
  const { size, style, series, ...other } = props;

  return (
    <DataPanelElement
      sizeX={size ? size : 1}
      sizeY={size ? size : 1}
      style={{
        ...style,
        justifyContent: "space-around",
        display: "flex",
      }}
      {...other}
    >
      <h1
        style={{
          gridRow: "1",
          gridColumn: "1",
          textAlign: "center",
          fontSize: (size * 1.1).toString() + "rem",
        }}
      >
        Uzun yazi denemesi yapıyorum
      </h1>
      <Pie
        className="fixed-size"
        data={{
          labels: series[0].data.map((s) => s.label),
          datasets: [
            {
              data: series[0].data.map((s) => s.value),
              backgroundColor: light_colorArray,
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </DataPanelElement>
  );
}
