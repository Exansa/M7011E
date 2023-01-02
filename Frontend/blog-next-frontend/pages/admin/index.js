import { Box, Stack, Typography, Button, Grid } from "@mui/material";
import posts from "../../data/mock_db/posts";
import GenericCard from "../../resource/components/global/card";
import { useState } from "react";
import AdminPage from "../../resource/layout/adminPage";
import Page from "../../resource/layout/page";



export default function AdminDashboard() {
  const sliceIncrement = 4;
  const [maxSlice, setMaxSlice] = useState(sliceIncrement);

  const handleSliceChange = () => {
    if (maxSlice + sliceIncrement <= posts.length) {
      setMaxSlice(maxSlice + sliceIncrement);
    }
  }


  return (
    <>
    
      <AdminPage title="AdminDashboard">
        <Box sx={{ mx: 5, my: 3 }}>
          <Stack direction={"column"}>
            <Typography variant="h1" component="h2">
              Browse Posts
            </Typography>

            <Typography variant="h2" component="h3">
              Featured
            </Typography>

            <Grid container spacing={3} sx={{ mb: 2 }}>
              {posts.slice(0, maxSlice).map((post) => (
                <Grid item flexwrap="wrap">
                  <GenericCard postID={post.id} />
                </Grid>
              ))}
            </Grid>
            <Button onClick={handleSliceChange}>Load More</Button>
          </Stack>
        </Box>
      </AdminPage>
    </>
  );
}