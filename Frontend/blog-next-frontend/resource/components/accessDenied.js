//import { Box } from '@mui/system'
import { Box, Typography, Link, Button } from "@mui/material";
import { signIn } from 'next-auth/react';
import Page from "../layout/page";

export default function AccessDenied () {
  return (
    <Box sx={{ mx: 5, my: 3 }}>
      <Typography variant="h1">Access Denied</Typography>
      <Typography variant="h5">You must be signed in to view this page</Typography>
      <Link href="/api/auth/signin">
        <Button 
           variant="contained"
           onClick={(e) => {
           e.preventDefault(),
           signIn();}}>
            Sign in
        </Button>
      </Link>
    </Box>
  )
}