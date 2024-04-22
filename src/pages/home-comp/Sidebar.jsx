import { useSelector } from "react-redux";

export default function Sidebar() {
  const selectedNeighbourhood = useSelector(
    (state) => state.selectedNeighbourhood.selectedNeighbourhood
  );

  return (
    <div>
      <h1>{selectedNeighbourhood && selectedNeighbourhood.MAHALLEADI}</h1>
    </div>
  );
}
