//import { Box } from '@mui/system'
import { Box, Typography, Link, Button } from "@mui/material";
import { signIn, useSession } from "next-auth/react";

export default function AccessDenied() {
  const { data: session, status } = useSession();

  return (
    <page>
      <Box sx={{ mx: 5, my: 3 }}>
        <Typography variant="h1">Access Denied</Typography>
        {!session && (
          <>
            <Typography variant="h5">
              You might have to log in to view this page.
            </Typography>
            <Link href="/api/auth/signin">
              <Button
                variant="contained"
                onClick={(e) => {
                  e.preventDefault(), signIn();
                }}
              >
                Sign in
              </Button>
            </Link>
          </>
        )}
      </Box>
    </page>
  );
}
