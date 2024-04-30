export default function DataPanelGroup(props) {
  const { children, gridY, style, ...other } = props;
  const height = (gridY * 17).toString().concat("vw");

  const max_space = 3 * gridY;
  var remaining_space = max_space;
  const sliced_children = children.map((child) => {
    if (child.props.sizeX && child.props.sizeY) {
      if (child.props.sizeX * child.props.sizeY <= remaining_space) {
        remaining_space -= child.props.sizeX * child.props.sizeY;
        return child;
      }
    } else if (child.props.size) {
      if (child.props.size * child.props.size <= remaining_space) {
        remaining_space -= child.props.size * child.props.size;
        return child;
      }
    }
    return null;
  });

  return (
    <div
      className="data-panel-group"
      style={{
        gridTemplateRows: `repeat(${gridY}, 1fr)`,
        ...style,
      }}
      {...other}
    >
      {sliced_children}
    </div>
  );
}
