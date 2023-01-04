import { Box, Stack, Typography, Button, Grid } from "@mui/material";
import ResponsiveAppBar from "../../resource/layout/headerBar";
import Page from "../../resource/layout/page";
import posts from "../../data/mock_db/posts";
import GenericCard from "../../resource/components/global/card";
import { useState } from "react";


export async function getServerSideProps(){
  const res = await fetch('https:localhost:5001/posts');
    const data = await res.json();
    return{
        props: {
            data
        } 
    }
}

export default function Browse({data}) {

  const sliceIncrement = 4;
  const [maxSlice, setMaxSlice] = useState(sliceIncrement);

  const handleSliceChange = () => {
    if (maxSlice + sliceIncrement <= posts.length) {
      setMaxSlice(maxSlice + sliceIncrement);
    }
  };

  const {results = []} = data;
  

  return (
    <>
      <Page title="Browse">
        <Box sx={{ mx: 5, my: 3 }}>
          <Stack direction={"column"}>
            <Typography variant="h1" component="h2">
              Browse Posts
            </Typography>

            <Typography variant="h2" component="h3">
              Featured
            </Typography>
            <Grid container spacing={3} sx={{ mb: 2 }}>
              {results.map(result => {
                const { _id, title, content } = results;

                return(
                  <Grid item flexwrap="wrap">
                  <GenericCard postID={_id} />
                </Grid>
              )})}
            </Grid>
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
      </Page>
    </>
  );
}
