import {
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Stack,
} from "@mui/material";
import AutoCompleteFetcher from "./autoCompleteFetcher";
import { PropTypes } from "prop-types";
import { useState } from "react";

SearchPostsForm.propTypes = {
  defaultContent: PropTypes.object.isRequired,
  setResults: PropTypes.func.isRequired,
  dialog: PropTypes.bool,
  loader: PropTypes.object,
};

export default function SearchPostsForm(props) {
  const { defaultContent, setResults, dialog, loader } = props;

  const [title, setTitle] = useState("");
  const [targetUserID, setTargetUserID] = useState("");
  const [content, setContent] = useState("");
  const [targetTags, setTargetTags] = useState([]);
  const [targetCategoryID, setTargetCategoryID] = useState("");

  const width = dialog ? 12 : 6;

  const handleRequest = async () => {
    if (
      title.length < 1 &&
      content.length < 1 &&
      targetUserID.length < 1 &&
      targetTags.length < 1 &&
      targetCategoryID.length < 1
    ) {
      setResults(defaultContent.posts);
      return;
    }

    if (loader) {
      loader.setLoading(true);
    }

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
        setResults(results);
        console.log("Search results: ");
        console.log(results);
      }
      if (loader) {
        loader.setLoading(false);
      }
    });
  };

  const handleReset = () => {
    setResults(defaultContent.posts);
  };

  const base = (
    <Grid
      container
      direction="row"
      justifyContent={{ xs: "center", md: "flex-start" }}
      alignItems="flex-start"
      spacing={1}
    >
      <Grid item xs={12} md={width / 2}>
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
      <Grid item xs={12} md={width / 2}>
        {/* ------------------ User Search ------------------ */}
        <AutoCompleteFetcher
          label="User"
          noOptionsText="No users found"
          setSelectedItem={setTargetUserID}
          defaultItems={defaultContent.users}
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
        <Grid item xs={12} md={width}>
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
      <Grid item xs={12} md={width / 2}>
        {/* ------------------ Tags ------------------ */}
        <AutoCompleteFetcher
          label="Tag"
          noOptionsText="No tags found"
          setSelectedItem={setTargetTags}
          defaultItems={defaultContent.tags}
          apiURL="http://localhost:5001/search/tags?set=1"
          requestKey="name"
          multiple={true}
          noneValue={[]}
        />
      </Grid>
      <Grid item xs={12} md={width / 2}>
        {/* ------------------ Category ------------------ */}
        <AutoCompleteFetcher
          label="Category"
          noOptionsText="No categories found"
          setSelectedItem={setTargetCategoryID}
          defaultItems={defaultContent.categories}
          apiURL="http://localhost:5001/search/categories?set=1"
          requestKey="name"
          valueKey="_id"
          multiple={false}
          noneValue=""
        />
      </Grid>
    </Grid>
  );

  const actions = (
    <Stack direction="row">
      <Button onClick={handleRequest} color="primary">
        Search
      </Button>
      <Button onClick={handleReset} color="primary">
        Reset
      </Button>
      {dialog && <Button onClick={dialog.close}>Close</Button>}
    </Stack>
  );

  if (dialog) {
    return (
      <Dialog open={dialog.state} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Search Posts</DialogTitle>
        <DialogContent>{base}</DialogContent>
        <DialogActions>{actions}</DialogActions>
      </Dialog>
    );
  } else {
    return (
      <Stack direction="column">
        {base}
        {actions}
      </Stack>
    );
  }
}
