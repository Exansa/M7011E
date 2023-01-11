// Based on example from https://mui.com/components/tabs/

import * as React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box, Grid, Typography, Button } from "@mui/material";
import Posts from "../../../data/mock_db/posts";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

export async function getStaticProps() {
  const postRef =
    "http://localhost:5001/user/" + session.user._id + "/" + "posts?set=1";
  const postRes = await fetch(postRef, {
    method: "GET",
    header: {
      accept: "application/json",
    },
  });
  const result = await postRes.json();
  const postData = result;
  console.log("postdata", postData);
  const set = 2;
  /*while(result){
    postData = postData + result;
    const postRef = "http://localhost:5001/user/" + session.user._id + "/" + "?set=" + set;
    const postRes = await fetch(postRef, {
      method: "GET",
      header: {
        accept: "application/json",
      }
    });
    const result = await postRes.json();
    set = set + 1;
  }*/

  return {
    props: {
      posts: postData,
      users: userData,
      tags: tagData,
      categories: categoryData,
    },
  };
}

function TabPanel(context) {
  const { children, value, index, ...other } = context;
  console.log(context.posts);
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(context) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const GenericCard = dynamic(() => import("../global/card"), { ssr: false });

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Posts" {...a11yProps(0)} />
          <Tab label="Comments" {...a11yProps(1)} />
          <Tab label="Media" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid container spacing={2}>
          {context.posts &&
            context.posts.map((post) => {
              return (
                <Grid key={post._id + "-grid-item"} item>
                  <GenericCard key={post._id + "-post-item"} post={post} />
                </Grid>
              );
            })}
        </Grid>
        {/*TODO: Load more slices when this is pressed<Button onClick={handleSliceChange}>Load More</Button>*/}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Not implemented yet
      </TabPanel>
      <TabPanel value={value} index={2}>
        Not implemented yet
      </TabPanel>
    </Box>
  );
}
