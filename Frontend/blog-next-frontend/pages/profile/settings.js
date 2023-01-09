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
  const path = 'http://localhost:5001/user/' + session.user._id;
  async function handleOnButtonClick(e){
    const res = await fetch(path, {
      method: 'GET',
      headers: {
        accept: "application/json",
      }
    });
    const result = await res.json();
    console.log(result);
  }

  if (!session){ return  <Page><AccessDenied/></Page> }
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
