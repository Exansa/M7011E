import ResponsiveAppBar from "../../resource/components/global/headerBar";
import { Box, Stack, Avatar } from "@mui/material";
import Users from "../../data/mock_db/users";
import Page from "../../resource/components/page";

export function Profile() {
  let user = Users[0]; //TODO: Auth

  return (
    <>
      <Page title={"Profile: " + user.username}>
        <ResponsiveAppBar />

        <Box sx={{ mx: 4, my: 4 }}>
          <Stack direction="column">
            <Avatar alt="Error loading avatar" src={user.image.href}></Avatar>
          </Stack>
        </Box>
      </Page>
    </>
  );
}
export default Profile;
