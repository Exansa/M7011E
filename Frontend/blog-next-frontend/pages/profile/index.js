import { Box, Stack } from "@mui/material";
import Users from "../../data/mock_db/users";
import Page from "../../resource/layout/page";
import UserCard from "../../resource/components/users/userCard";
import ProfileTabs from "../../resource/components/users/profileTabs";

export function Profile() {
  let currentUser = Users[0]; //TODO: Auth

  return (
    <>
      <Page title={"Profile: " + currentUser.username}>
        <Box justifyContent={"flex-start"} sx={{ mx: 4, my: 4 }}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
          >
            <UserCard user={currentUser} />
            <ProfileTabs user={currentUser} />
          </Stack>
        </Box>
      </Page>
    </>
  );
}
export default Profile;
