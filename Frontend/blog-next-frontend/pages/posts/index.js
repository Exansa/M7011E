import { Box, Stack, Typography, Button, Grid } from "@mui/material";
import ResponsiveAppBar from "../../resource/layout/headerBar";
import Page from "../../resource/layout/page";
import GenericCard from "../../resource/components/global/card";
import { useState } from "react";
import { PrintOutlined } from "@mui/icons-material";

export async function getStaticProps() {
  const res = await fetch("http:localhost:5001/posts?set=1");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default function Browse(context) {
  const sliceIncrement = 4;
  const [maxSlice, setMaxSlice] = useState(sliceIncrement);

  const handleSliceChange = () => {
    if (maxSlice + sliceIncrement <= 10) {
      setMaxSlice(maxSlice + sliceIncrement);
    }
  };

  console.log(context.data);

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
              {context.data.map((result) => (
                <Grid item flexwrap="wrap">
                  <GenericCard post={result} />
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
