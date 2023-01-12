import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AdminPostsTab from "./tabs/adminPostsTab";
import AdminFiltersTab from "./tabs/adminFiltersTab";
import AdminUsersTab from "./tabs/adminUsersTab";

import { useSession } from "next-auth/react";

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

  const { data: session } = useSession();

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
        <Tab label="Filters" {...a11yProps(3)} />
        {session.user.access === "superAdmin" && (
          <Tab label="Admins" {...a11yProps(4)} />
        )}
      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography>Overview</Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AdminUsersTab data={data.users} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AdminPostsTab data={data} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Grid container direction="row" spacing={{ xs: 3 }}>
          <Grid item>
            <AdminFiltersTab
              data={data.categories}
              label={"Categories"}
              apiDestination={"categories"}
            />
          </Grid>
          <Grid item>
            <AdminFiltersTab
              data={data.tags}
              label={"Tags"}
              apiDestination={"tags"}
            />
          </Grid>
        </Grid>
      </TabPanel>
      {session.user.access === "superAdmin" && (
        <TabPanel value={value} index={4}>
          <Typography>Admins</Typography>
        </TabPanel>
      )}
    </Box>
  );
}
