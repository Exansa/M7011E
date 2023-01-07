import {
  Box,
  Stack,
  Typography,
  Button,
  Grid,
  TextField,
  Autocomplete,
  Avatar,
} from "@mui/material";
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
  const postRes = await fetch("http:localhost:5001/posts?set=1");
  const postData = await postRes.json();
  const userRes = await fetch("http:localhost:5001/user?set=1");
  const userData = await userRes.json();

  return {
    props: {
      posts: postData,
      users: userData,
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
  const [posts, setPosts] = useState(context.posts);
  const [users, setUsers] = useState(context.users);
  const [targetUserName, setTargetUserName] = useState("");
  const [targetUserID, setTargetUserID] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const passiveFetch = useMemo(
    () =>
      debounce(async ({ request, destination, updateState }) => {
        const hit = await fetch(destination, {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        });

        await hit.json().then((data) => {
          if (data) {
            updateState(data);
          }
        });
      }, 600),
    []
  );

  function handleSliceChange() {
    if (maxSlice + sliceIncrement <= 10) {
      setMaxSlice(maxSlice + sliceIncrement);
    }
  }

  async function handleSearch() {
    if (title.length < 1 && content.length < 1 && targetUserID.length < 1) {
      setPosts(context.posts);
      return;
    }

    const request = {
      search: {
        title: title,
        content: content,
        user_id: targetUserID,
        categories_id: [],
        tags_id: [],
        media_id: [],
      },
    };

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
  }

  function handleUserRequest(event, newInputValue) {
    const request = {
      search: {
        username: newInputValue,
        email: "",
        profilePicture_id: "",
      },
    };

    passiveFetch({
      request: request,
      destination: "http://localhost:5001/search/users?set=1",
      updateState: setUsers,
    });
  }

  function handleUserLabel(event, newSelection) {
    if (newSelection) {
      setTargetUserID(newSelection._id);
      console.log("User ID: " + targetUserID);
    }
  }

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
              <Button onClick={handleReset}>Reset</Button>
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
                <Autocomplete
                  id="user-search"
                  filterOptions={(x) => x}
                  options={users}
                  getOptionLabel={(option) =>
                    option.username ? option.username : ""
                  }
                  noOptionsText="No users found"
                  isOptionEqualToValue={(option, value) =>
                    option.username === value.username
                  }
                  onChange={(event, newSelection) => {
                    handleUserLabel(event, newSelection);
                  }}
                  onInputChange={(event, newInputValue) => {
                    handleUserRequest(event, newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="User"
                      placeholder="User"
                      fullWidth
                    />
                  )}
                  renderOption={(props, option) => {
                    return (
                      <li {...props}>
                        <Stack direction={"row"} spacing={2}>
                          <Avatar
                            alt={option.username}
                            src={option.profile_picture.href}
                          />
                          <Stack direction={"column"}>
                            <Typography variant="body1" color="text.primary">
                              {option.username}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              ID: {option._id}
                            </Typography>
                          </Stack>
                        </Stack>
                      </li>
                    );
                  }}
                />
              </Grid>
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
              <Grid item xs={3}>
                <Button onClick={handleSearch}>Search</Button>
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
