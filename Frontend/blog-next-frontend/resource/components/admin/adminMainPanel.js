import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EnhancedTable from "./tabs/adminPostsTab";

//Based on MUI Tab example
//https://mui.com/components/tabs/

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 3,
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function AdminPanel({ data }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        //flexGrow: 1,
        //bgcolor: "background.paper",
        display: "flex",
        mx: "5vh",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Overview" {...a11yProps(0)} />
        <Tab label="Users" {...a11yProps(1)} />
        <Tab label="Posts" {...a11yProps(2)} />
        <Tab label="Tags" {...a11yProps(3)} />
        <Tab label="Categories" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography>Overview</Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography>Users</Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EnhancedTable data={data} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography>Tags</Typography>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Typography>Categories</Typography>
      </TabPanel>
    </Box>
  );
}
