import ResponsiveAppBar from "../../resource/layout/headerBar";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import Page from "../../resource/layout/page";
import Users from "../../data/mock_db/users";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import AccessDenied from "../../resource/components/accessDenied";



export function Settings() {
  const { data: session } = useSession();
  async function handleOnButtonClick(e){
    const path = 'http://localhost:5001/admins?set=1';
    const access = "Bearer " + session.accessToken;
    const res = await fetch(path, {
      method: "GET",
      headers: {
        accept: "*/*", 
        Authorization: access
      }
    });
    console.log('res', res)
    const result = await res.json();
    console.log('result: ',result);
    for(let i=0; i<result.length; i++){
      if (result.user_id == session.user._id){
        console.log("true")
        break;
      } else {
        console.log("false")
      }
    }
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
