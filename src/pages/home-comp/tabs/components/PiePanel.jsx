import DataPanelElement from "./DataPanelElement";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { light_colorArray, dark_colorArray } from "./ChartColors";
import { useSelector } from "react-redux";

export default function PiePanel(props) {
  const { size, style, series, name, ...other } = props;
  const darkMode = useSelector((state) => state.uiSett.darkMode);

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
        className="data-panel-title"
        style={{
          color: darkMode ? "var(--dark-text)" : "var(--light-text)",
          fontSize: (size * 1.1).toString() + "rem",
        }}
      >
        {name ? name : "Pie Chart"}
      </h1>
      <Pie
        className="fixed-size"
        data={{
          labels: series[0].data.map((s) => s.label),
          datasets: [
            {
              data: series[0].data.map((s) => s.value),
              backgroundColor: darkMode ? dark_colorArray : light_colorArray,
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
