import { Box, Stack } from "@mui/material";
import Users from "../../data/mock_db/users";
import Page from "../../resource/layout/page";
import UserCard from "../../resource/components/users/userCard";
import ProfileTabs from "../../resource/components/users/profileTabs";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useSession } from "next-auth/react";

export function Profile() {
  const { data: session } = useSession();

  return (
    session &&(
      <>
        <Page title={"Profile: " + session.user.username}>
          <Box sx={{ minHeight: "80vh", top: 0, my: 4, mx: 4 }}>
            <Stack direction="column" spacing={2}>
              <Box sx={{ top: 0 }}>
                <UserCard user={currentUser} />
              </Box>
              <ProfileTabs user={currentUser} />
            </Stack>
          </Box>
        </Page>
      </>
    )
  );
}
export default Profile;
