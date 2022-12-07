import ResponsiveAppBar from "../../resource/components/global/headerBar";
import { Box, Stack, Avatar, Card } from "@mui/material";
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
            <Card raised sx={{ padding: 5, width: { md: "40%", xs: "90%" } }}>
              <Avatar
                alt="Error loading avatar"
                src={user.image.href}
                sx={{ width: 250, height: 250 }}
              />
            </Card>
          </Stack>
        </Box>
      </Page>
    </>
  );
}
export default Profile;
