import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Box, Stack } from "@mui/material";

import ResponsiveAppBar from "../resource/components/global/headerBar";
import GenericCard from "../resource/components/global/card";
import React from "react";
import Page from "../resource/components/page";

export default function Home() {
  return (
    <>
      <Page title="Index">
        <ResponsiveAppBar />
        <Box mx={"10%"} my="10%">
          <h1 className={styles.title}>
            Welcome to <a href="">the Blog!</a>
          </h1>
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
