export default function DataPanelGroup(props) {
  const { children, gridY, style, ...other } = props;

  const max_space = 3 * gridY;
  var remaining_space = max_space;
  console.log(children);
  const sliced_children =
    typeof children === "object"
      ? children.length > 0
        ? children.map((child) => {
            if (
              child === null ||
              child === undefined ||
              child.props === null ||
              child.props === undefined
            )
              return null;
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
          })
        : null
      : children;
  return (
    <div
      className="data-panel-group"
      style={{
        gridTemplateRows: `repeat(${gridY}, 1fr)`,
        ...style,
      }}
      {...other}
    >
      {sliced_children && sliced_children.filter((el) => el !== null)}
    </div>
  );
}
