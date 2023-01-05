import styles from "../styles/Home.module.css";
import { Box, Stack, Typography } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";
import { signIn, signOut, useSession } from "next-auth/react";
import ResponsiveAppBar from "../resource/layout/headerBar";
import GenericCard from "../resource/components/global/card";
import React from "react";
import Page from "../resource/layout/page";

export default function Home() {
  //const { user, error, isLoading } = useUser();
  const {data: session } = useSession();
  //console.log(session)

  return (
    <>
      <Page title="Index">
        <Box mx={"10%"} my="10%">
          <Typography variant="h1"> {session ?  `${session.user.email}, ` : ''}Welcome to the blog! </Typography>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="space-between"
            alignContent={"center"}
          >
            <GenericCard postID={1} />

            <GenericCard postID={2} />

            <GenericCard postID={3} />

            <GenericCard postID={4} />
          </Stack>
        </Box>
      </Page>
    </>
  );
}
