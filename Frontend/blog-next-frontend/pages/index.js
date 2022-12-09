import { Box, Typography, Grid } from "@mui/material";

import GenericCard from "../resource/components/global/card";
import React from "react";
import Page from "../resource/layout/page";

export default function Home() {
  return (
    <>
      <Page title="Index">
        <Box mx={"10%"} my="10%">
          <Typography variant="h1"> Welcome to the blog! </Typography>
          <Grid container spacing={3} sx={{ mb: 2 }}>
            <Grid item flexwrap="wrap">
              <GenericCard postID={1} />
            </Grid>

            <Grid item flexwrap="wrap">
              <GenericCard postID={2} />
            </Grid>

            <Grid item flexwrap="wrap">
              <GenericCard postID={3} />
            </Grid>

            <Grid item flexwrap="wrap">
              <GenericCard postID={4} />
            </Grid>
          </Grid>
        </Box>
      </Page>
    </>
  );
}
