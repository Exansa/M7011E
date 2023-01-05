import ResponsiveAppBar from "../resource/layout/headerBar";
import { Box } from "@mui/system";
import Page from "../resource/layout/page";
//import YouTube from "react-youtube";
import React from "react";
import { Typography, Stack } from "@mui/material";

export function About() {
  return (
    <Page>
      <Box sx={{ width: "60%", mx: "auto", mt: 5 }}>
        <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
          <video autoPlay muted loop>
            <source
              src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              type="video/mp4"
            />
          </video>
          <Typography variant="h3" component="h2">
            About this site
          </Typography>
          <Typography variant="body1" component="p">
            The project for M7011E 2022 by the group gamla och bittra; with
            Elliot Huber, Magnus Stenfelt, Peter Panduro and Tovah Parnes. Our
            porject is a blog style website where we will make it using the
            frameworks NextJS and Dart and then compare the performance of the
            two different systems. They will have a shared backend and database
            so we can see the difference in them without other factors.
            <br />
            <br />
            You can post things and try the user functionality. If you ever
            become bored we have placed a nice little video here for you to
            watch. Enjoy!
          </Typography>
        </Stack>
      </Box>
    </Page>
  );
}
export default About;
