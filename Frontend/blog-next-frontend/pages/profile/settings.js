import ResponsiveAppBar from "../../resource/layout/headerBar";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import Page from "../../resource/layout/page";
import Users from "../../data/mock_db/users";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useSession } from "next-auth/react";



export function Settings() {
  const { data: session } = useSession();
  
  const fetchToken = async() => {
    const response = await fetch('..\api\token\index.js')
    const data = await response
    //console.log(data)

    
  }

  

  return (
    session &&(
      <Page title={"Settings: " + session.name}>
       <Box>
        <Button onClick={(event) => {
                    fetchToken()
                  }}>
          edit
        </Button>
       </Box>
      </Page>
    )
  );
}
export default Settings;
