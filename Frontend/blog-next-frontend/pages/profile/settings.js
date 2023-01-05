import ResponsiveAppBar from "../../resource/layout/headerBar";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import Page from "../../resource/layout/page";
import Users from "../../data/mock_db/users";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useSession } from "next-auth/react";
import getAToken from "../api/GetAccessToken";
import { NextApiRequest, NextApiResponse } from "next";



export function Settings() {
  const { data: session } = useSession();

  async function handleOnButtonClick(e){
    const results = await fetch('./api/GetAccessToken')
    console.log(results)
  }

  return (
    session &&(
      <Page title={"Settings: " + session.name}>
       <Box>
        <Button onClick={handleOnButtonClick}>
          edit
        </Button>
       </Box>
      </Page>
    )
  );
}
export default Settings;
