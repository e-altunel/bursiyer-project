import { useSelector } from "react-redux";
import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { Tab1 } from "./tabs/tab1";
import CustomTabPanel from "./tabs/CustomTabPanel";
import { MarkerTab } from "./tabs/MarkerTab";
import Navbar from "./Navbar";

function a11yProps(index, darkMode = false) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    style: {
      color: darkMode ? "var(--dark-text)" : "var(--light-text)",
    },
  };
}

export default function Sidebar() {
  const selectedNeighbourhood = useSelector(
    (state) => state.selectedNeighbourhood.selectedNeighbourhood
  );
  const [value, setValue] = React.useState(0);
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  const isAdmin = useSelector((state) => state.uiSett.isAdmin);
  const darkMode = useSelector((state) => state.uiSett.darkMode);
  const navbar_size = useSelector((state) => state.uiSett.navbar.size);
  const navbar_padding = useSelector((state) => state.uiSett.navbar.padding);

  return (
    <Box
      style={{
        height: "100%",
        display: "grid",
        gridTemplateRows: "auto 1fr",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div
        className="navbar-grid container-flex"
        style={{
          height: navbar_size,
          padding: navbar_padding,
        }}
      >
        <Navbar />
      </div>
      <Box
        style={{
          height: "100%",
          display: "grid",
          overflow: "auto",
          gridTemplateRows: "auto 1fr",
        }}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
          style={{
            height: "5%",
          }}
        >
          <Tab label="Item One" {...a11yProps(0, darkMode)} />
          {selectedNeighbourhood ? (
            <Tab label="Mahalle" {...a11yProps(1, darkMode)} />
          ) : (
            <Tab label="Mahalle Seçiniz" {...a11yProps(1, darkMode)} disabled />
          )}
          {isAdmin && <Tab label="Item Three" {...a11yProps(2, darkMode)} />}
        </Tabs>
        <MarkerTab value={value} index={0} />
        <Tab1 value={value} index={1} />
        <CustomTabPanel value={value} index={2}>
          {isAdmin ? "Admin" : "Not Admin"}
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
