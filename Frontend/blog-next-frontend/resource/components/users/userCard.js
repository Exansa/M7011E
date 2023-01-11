import { PropTypes } from "prop-types";
import { Box, Stack, Avatar, Card, Button, Typography } from "@mui/material";
import Routes from "../../routes";

/*UserCard.PropTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    image: PropTypes.shape({
      href: PropTypes.string.isRequired,
    }),
  }),
};*/

export default function UserCard({ user }) {
  return (
    <>
      <Card raised sx={{ padding: 5, width: { md: "40%", xs: "90%" } }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Avatar
            alt="Error loading avatar"
            src={user.profile_picture}
            sx={{ width: 250, height: 250 }}
          />
          <Stack direction="column" spacing={2} sx={{ mt: 2 }}>
            <Typography variant="h2" component={"h2"}>
              {user.username}
            </Typography>
            <Typography variant="body" component="h3">
              {user.email}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" href={Routes.users.settings}>
                Settings
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </>
  );
}
