import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import Page from "./page";

export default function Loading(context) {
  return (
    <>
      <Page title="Loading">
        <Box sx={{ mx: "auto", my: "auto" }}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
            <Typography>Loading...</Typography>
          </Stack>
        </Box>
      </Page>
    </>
  );
}
