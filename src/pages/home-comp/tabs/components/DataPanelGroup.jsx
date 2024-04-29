export default function DataPanelGroup(props) {
  const { children, gridY, style, ...other } = props;
  const height = ((gridY * 200) / 9).toString().concat("vh");

  return (
    <div
      className="data-panel-group"
      style={{
        "grid-template-rows": `repeat(${gridY}, 1fr)`,
        height: height,
        ...style,
      }}
      {...other}
    >
      {children}
    </div>
  );
}
