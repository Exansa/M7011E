import { Box, Stack, Typography, Button } from "@mui/material";
import ResponsiveAppBar from "../../resource/components/global/headerBar";
import Page from "../../resource/components/page";
import posts from "../../data/mock_db/posts";
import GenericCard from "../../resource/components/global/card";
import { useState } from "react";

export default function Browse() {
  const sliceIncrement = 4;
  const [maxSlice, setMaxSlice] = useState(sliceIncrement);

  const handleSliceChange = () => {
    if (maxSlice + sliceIncrement <= posts.length) {
      setMaxSlice(maxSlice + sliceIncrement);
    }
  };

  return (
    <>
      <Page title="Browse">
        <ResponsiveAppBar />
        <Box sx={{ mx: 5, my: 3 }}>
          <Stack direction={"column"}>
            <Typography variant="h1" component="h2">
              Browse Posts
            </Typography>

            <Typography variant="h2" component="h3">
              Featured
            </Typography>

            <Stack
              direction="row"
              flexWrap="wrap"
              justifyContent="space-between"
            >
              {posts.slice(0, maxSlice).map((post) => (
                <Box sx={{ mx: 1, my: 2 }}>
                  <GenericCard postID={post.id} />
                </Box>
              ))}
            </Stack>
            <Button onClick={handleSliceChange}>Load More</Button>
          </Stack>
        </Box>
      </Page>
    </>
  );
}
