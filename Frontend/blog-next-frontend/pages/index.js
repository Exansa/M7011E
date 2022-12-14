import styles from "../styles/Home.module.css";
import { Box, Stack, Typography } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";
import { signIn, signOut, useSession } from "next-auth/react";
import ResponsiveAppBar from "../resource/layout/headerBar";
import dynamic from "next/dynamic";
import GenericCard from "../resource/components/global/card";
import React from "react";
import Page from "../resource/layout/page";

export async function getStaticProps() {
  const res = await fetch("http:localhost:5001/posts?set=1");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default function Home(context) {
  const GenericCard = dynamic(
    () => import("../resource/components/global/card"),
    { ssr: false }
  );

  return (
    <>
      <Page title="Home">
        <Box mx={"10%"} my="10%">
          <Typography variant="h1">Welcome to the blog!</Typography>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="space-between"
            alignContent={"center"}
          >
            {context.data.slice(0, 3).map((post) => (
              <GenericCard key={post._id + "-card"} post={post} />
            ))}
          </Stack>
        </Box>
      </Page>
    </>
  );
}
