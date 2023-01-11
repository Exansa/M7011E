import {
  Box,
  Stack,
  Typography,
  Button,
  Grid,
  TextField,
  Autocomplete,
  Avatar,
  CircularProgress,
} from "@mui/material";
import dynamic from "next/dynamic";
import Page from "../../resource/layout/page";
import GenericCard from "../../resource/components/global/card";
import { useState, useMemo } from "react";
import { debounce } from "@mui/material/utils";
import AutoCompleteFetcher from "../../resource/components/search/autoCompleteFetcher";
import SearchPostsForm from "../../resource/components/search/searchPostsForm";

export async function getStaticProps() {
  const postRes = await fetch("http:localhost:5001/posts?set=1");
  const postData = await postRes.json();
  const userRes = await fetch("http:localhost:5001/user?set=1");
  const userData = await userRes.json();
  const tagRes = await fetch("http:localhost:5001/tags?set=1");
  const tagData = await tagRes.json();
  const categoryRes = await fetch("http:localhost:5001/categories?set=1");
  const categoryData = await categoryRes.json();

  return {
    props: {
      posts: postData,
      users: userData,
      tags: tagData,
      categories: categoryData,
    },
  };
}

export default function Browse(context) {
  const sliceIncrement = 4;
  const [maxSlice, setMaxSlice] = useState(sliceIncrement);
  const [posts, setPosts] = useState(context.posts);
  const [searching, setSearching] = useState(false);

  // Dynamic import to avoid SSR-related issues
  const GenericCard = dynamic(
    () => import("../../resource/components/global/card"),
    { ssr: false }
  );

  // TODO: Pagnation / infinite scroll
  function handleSliceChange() {
    if (maxSlice + sliceIncrement <= 10) {
      setMaxSlice(maxSlice + sliceIncrement);
    }
  }

  return (
    <>
      <Page title="Browse">
        <Box sx={{ mx: 5, my: 3 }}>
          <Stack direction={"column"} spacing={5}>
            <Typography variant="h1" component="h2">
              Browse Posts
            </Typography>
            <Stack direction={"row"} spacing={2}>
              <Typography variant="h4" component="h4">
                Search
              </Typography>
            </Stack>

            {/* ------------------ Search ------------------ */}
            {/* --------See component for more info--------- */}
            <SearchPostsForm
              defaultContent={context}
              setResults={setPosts}
              loader={{ setLoading: setSearching }}
            />

            {/* ------------------ Results ------------------ */}
            {/* <Typography variant="h4" component="h4">
              Search Parameters:
            </Typography>
            <Typography variant="body1" component="body1">
              Title: {title} <br />
              User ID: {targetUserID} <br />
              Content: {content} <br />
              Tags: {targetTags.map(
                (tag) => tag.name + " (" + tag._id + "),"
              )}{" "}
              <br />
              Category ID: {targetCategoryID}
            </Typography> */}

            <Typography variant="h4" component="h4">
              Featured
            </Typography>
            {searching ? (
              <Stack
                direction={"row"}
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <CircularProgress />
                <Typography
                  variant="h6"
                  component="body2"
                  color="text.secondary"
                >
                  Loading...
                </Typography>
              </Stack>
            ) : posts.length > 0 ? (
              <Grid
                container
                direction={"row"}
                flexDirection={"row"}
                spacing={3}
                sx={{ mb: 2 }}
              >
                {posts.map((result) => (
                  <Grid key={result.title + "-grid-item"} item>
                    <GenericCard
                      key={result.title + "-card-item"}
                      post={result}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="h6" component="body2" color="text.secondary">
                No results found
              </Typography>
            )}
            {/*TODO: Load more slices when this is pressed*/}
            <Button onClick={handleSliceChange}>Load More</Button>
          </Stack>
        </Box>
      </Page>
    </>
  );
}
