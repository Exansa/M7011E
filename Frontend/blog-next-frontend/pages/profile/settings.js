import ResponsiveAppBar from "../../resource/components/global/headerBar";
import { Box } from "@mui/system";
import Page from "../../resource/components/page";
import Users from "../../data/mock_db/users";

export function Settings() {
  let user = Users[0]; //TODO: Auth
  return (
    <Page title={"Settings: " + user.username}>
      <ResponsiveAppBar />
      <Box></Box>
    </Page>
  );
}
export default Settings;
