export default function DataPanelElement(props) {
  const { children, sizeX, sizeY, style, ...other } = props;

  return (
    <div
      className="data-panel-element"
      style={{
        gridColumn: `span ${sizeX}`,
        gridRow: `span ${sizeY}`,
        ...style,
      }}
      {...other}
    >
      {children}
    </div>
  );
}
