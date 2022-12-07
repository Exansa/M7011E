import ResponsiveAppBar from "../../resource/layout/headerBar";
import { Box } from "@mui/system";
import Page from "../../resource/layout/page";
import Users from "../../data/mock_db/users";

export function Settings() {
  let user = Users[0]; //TODO: Auth
  return (
    <Page title={"Settings: " + user.username}>
      <Box></Box>
    </Page>
  );
}
export default Settings;
