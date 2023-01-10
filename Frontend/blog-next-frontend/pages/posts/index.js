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
import Page from "../../resource/layout/page";
import GenericCard from "../../resource/components/global/card";
import { useState, useMemo } from "react";
import { debounce } from "@mui/material/utils";
import AutoCompleteFetcher from "../../resource/components/search/autoCompleteFetcher";

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
  const [targetUserID, setTargetUserID] = useState("");
  const [targetTags, setTargetTags] = useState([]);
  const [targetCategoryID, setTargetCategoryID] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searching, setSearching] = useState(false);

  // TODO: Pagnation / infinite scroll
  function handleSliceChange() {
    if (maxSlice + sliceIncrement <= 10) {
      setMaxSlice(maxSlice + sliceIncrement);
    }
  }

  //Performs the search query
  async function handleSearch() {
    if (
      title.length < 1 &&
      content.length < 1 &&
      targetUserID.length < 1 &&
      targetTags.length < 1 &&
      targetCategoryID.length < 1
    ) {
      setPosts(context.posts);
      return;
    }

    setSearching(true);

    const request = {
      search: {
        title: title,
        content: content,
        user_id: targetUserID,
        categories_id: [],
        tags_id: [],
        media: "",
      },
    };

    // Since categories are an array, we push the id only if we have one
    if (targetCategoryID != "") {
      request.search.categories_id.push(targetCategoryID);
    }

    // Since tags are an array of objects, we need to convert them to an array of IDs
    if (targetTags.length > 0) {
      const tagIDs = [];
      targetTags.forEach((tag) => {
        tagIDs.push(tag._id);
      });
      request.search.tags_id = tagIDs;
    }

    console.log("Searching...");
    console.log(request);

    const data = await fetch("http://localhost:5001/search/posts?set=1", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    await data.json().then((results) => {
      if (results) {
        setPosts(results);
        console.log("Search results: ");
        console.log(results);
      }
    });

    setSearching(false);
  }

  // Resets the results to the default
  function handleReset() {
    setPosts(context.posts);
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

            <Grid
              container
              direction="row"
              justifyContent={{ xs: "center", md: "flex-start" }}
              alignItems="flex-start"
              spacing={1}
            >
              <Grid item xs={12} md={3}>
                <TextField
                  id="post-title"
                  label="Post title"
                  variant="outlined"
                  value={title}
                  fullWidth
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                {/* ------------------ User Search ------------------ */}
                <AutoCompleteFetcher
                  label="User"
                  noOptionsText="No users found"
                  setSelectedItem={setTargetUserID}
                  defaultItems={context.categories}
                  apiURL="http://localhost:5001/search/users?set=1"
                  requestKey="username"
                  valueKey="_id"
                  avatarKey={"profile_picture"}
                  extraParams={{ email: "", picture: "" }}
                  multiple={false}
                  noneValue=""
                />
              </Grid>
              {/* ------------------ Content ------------------ */}
              <Grid
                container
                item
                xs={12}
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                <Grid item xs={12} md={6}>
                  <TextField
                    id="content"
                    label="Content"
                    variant="outlined"
                    value={content}
                    fullWidth
                    onChange={(event) => {
                      setContent(event.target.value);
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} md={3}>
                {/* ------------------ Tags ------------------ */}
                <AutoCompleteFetcher
                  label="Tag"
                  noOptionsText="No tags found"
                  setSelectedItem={setTargetTags}
                  defaultItems={context.tags}
                  apiURL="http://localhost:5001/search/tags?set=1"
                  requestKey="name"
                  multiple={true}
                  noneValue={[]}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                {/* ------------------ Category ------------------ */}
                <AutoCompleteFetcher
                  label="Category"
                  noOptionsText="No categories found"
                  setSelectedItem={setTargetCategoryID}
                  defaultItems={context.categories}
                  apiURL="http://localhost:5001/search/categories?set=1"
                  requestKey="name"
                  valueKey="_id"
                  multiple={false}
                  noneValue=""
                />
              </Grid>
              <Grid item xs={12}>
                {/* ------------------ Buttons ------------------ */}
                <Stack direction={"row"} spacing={2}>
                  <Button variant="contained" onClick={handleSearch}>
                    Search
                  </Button>
                  <Button onClick={handleReset}>Reset</Button>
                </Stack>
              </Grid>
            </Grid>
            {/* ------------------ Results ------------------ */}
            <Typography variant="h4" component="h4">
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
            </Typography>

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
                {/* {posts.map((result) => (
                  <Grid item>
                    <GenericCard post={result} />
                  </Grid>
                ))} */}
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
