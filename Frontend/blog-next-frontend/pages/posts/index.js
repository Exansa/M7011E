import { Box, Stack, Typography, Button, Grid } from "@mui/material";
import Page from "../../resource/layout/page";
import GenericCard from "../../resource/components/global/card";
import { useState, useMemo } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import { debounce } from "@mui/material/utils";

export async function getStaticProps() {
  const res = await fetch("http:localhost:5001/posts?set=1");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

// async function fetchPosts(request) {
//   const hit = await fetch("http://localhost:5001/search/posts?set=1", {
//     method: "POST",
//     headers: {
//       accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(request),
//   });

//   const data = await hit.json();

//   return data;
// }

export default function Browse(context) {
  const sliceIncrement = 4;
  const [maxSlice, setMaxSlice] = useState(sliceIncrement);
  const [posts, setPosts] = useState(context.data);
  const [title, setTitle] = useState("");

  const fetchPosts = useMemo(
    () =>
      debounce(async (request, callback) => {
        const hit = await fetch("http://localhost:5001/search/posts?set=1", {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        });

        const data = await hit.json();

        if (data) {
          setPosts(data);
        }
      }, 300),
    []
  );

  function handleSliceChange() {
    if (maxSlice + sliceIncrement <= 10) {
      setMaxSlice(maxSlice + sliceIncrement);
    }
  }

  function handleSearch() {
    console.log("searching");
  }

  function handleUpdate() {
    const request = {
      search: {
        title: title,
        content: "",
        user_id: "",
        categories_id: [],
        tags_id: [],
        media_id: [],
      },
    };

    fetchPosts(request);
  }

  function handleReset() {
    setPosts(context.data);
  }

  console.log(context.data);

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
              <Button onClick={handleReset}>Reset</Button>
            </Stack>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 400,
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search posts"
                    onChange={(event) => {
                      setTitle(event.target.value);
                      handleUpdate();
                    }}
                    inputProps={{ "aria-label": "search posts" }}
                  />
                  <IconButton
                    onClick={handleSearch}
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                {/*TODO: Searchbar for categories*/}
              </Grid>
              <Grid item xs={6}>
                {/*TODO: Searchbar for tags*/}
              </Grid>
            </Grid>
            <Typography variant="h4" component="h4">
              Featured
            </Typography>
            <Grid container spacing={3} sx={{ mb: 2 }}>
              {posts.length > 0 ? (
                posts.map((result) => (
                  <Grid item flexwrap="wrap">
                    <GenericCard post={result} />
                  </Grid>
                ))
              ) : (
                <Typography variant="h4" component="h4">
                  No results found
                </Typography>
              )}
            </Grid>
            {/*TODO: Load more slices when this is pressed*/}
            <Button onClick={handleSliceChange}>Load More</Button>
          </Stack>
        </Box>
      </Page>
    </>
  );
}
