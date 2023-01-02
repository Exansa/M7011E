import ResponsiveAppBar from "../../resource/layout/headerBar";
import { Box } from "@mui/system";
import Page from "../../resource/layout/page";
import Users from "../../data/mock_db/users";
import { useUser } from "@auth0/nextjs-auth0/client";

export function Settings() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!user){ return  <Page><AccessDenied/></Page> }


  return (
    user &&(
      <Page title={"Settings: " + user.name}>
       <Box></Box>
      </Page>
    )
  );
}
export default Settings;
