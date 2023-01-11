import { Box, Stack } from "@mui/material";
import Users from "../../data/mock_db/users";
import Page from "../../resource/layout/page";
import UserCard from "../../resource/components/users/userCard";
import ProfileTabs from "../../resource/components/users/profileTabs";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useSession } from "next-auth/react";
import AccessDenied from "../../resource/components/accessDenied";

export function Profile() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <Page title={"Access denied"}>
        <AccessDenied />
      </Page>
    );
  }
  return (
    session && (
      <>
        <Page title={"Profile: " + session.user.username}>
          <Box sx={{ minHeight: "80vh", top: 0, my: 4, mx: 4 }}>
            <Stack direction="column" spacing={2}>
              <Box sx={{ top: 0 }}>
                <UserCard user={session.user} />
              </Box>
              <ProfileTabs user={session.user} />
            </Stack>
          </Box>
        </Page>
      </>
    )
  );
}
export default Profile;
