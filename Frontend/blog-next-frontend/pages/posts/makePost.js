import {
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import AutoCompleteFetcher from "../../resource/components/search/autoCompleteFetcher";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Routes from "../../resource/routes";
import Page from "../../resource/layout/page";

export async function getStaticProps() {
  const catData = await (
    await fetch("http://localhost:5001/categories?set=1")
  ).json();
  const tagData = await (
    await fetch("http://localhost:5001/tags?set=1")
  ).json();

  return {
    props: {
      categories: catData,
      tags: tagData,
    },
  };
}

function PostForm(props) {
  const { categories, tags } = props;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [targetTags, setTargetTags] = useState([]);
  const [targetCategoryID, setTargetCategoryID] = useState("");
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [media, setMedia] = useState("");
  const [loading, setLoading] = useState(false);

  const session = useSession();
  const router = useRouter();

  const width = 6;

  const handleRequest = async () => {
    if (
      title.length < 1 ||
      content.length < 1 ||
      media.length < 1 ||
      targetTags.length < 1 ||
      targetCategoryID.length < 1
    ) {
      openErrorDialog();
      return;
    }

    setLoading(true);

    const request = {
      post: {
        title: title,
        content: content,
        category_id: targetCategoryID,
        tags_id: [],
        media: media,
      },
    };

    // Since tags are an array of objects, we need to convert them to an array of IDs
    targetTags.forEach((tag) => {
      request.post.tags_id.push(tag._id);
    });

    const data = await fetch("http://localhost:5001/posts", {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: "Bearer " + session.data.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    setLoading(false);

    if (data.status != 200) {
      openErrorDialog();
      return;
    } else {
      router.push(Routes.posts.index);
    }
  };

  const closeErrorDialog = () => {
    setErrorDialogOpen(false);
  };

  const openErrorDialog = () => {
    setErrorDialogOpen(true);
  };

  return (
    <>
      <Dialog open={errorDialogOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Error!</DialogTitle>
        <DialogContent>Could not create post.</DialogContent>
        <DialogActions>
          <DialogActions>
            <Button onClick={closeErrorDialog}>Close</Button>
          </DialogActions>
        </DialogActions>
      </Dialog>
      <Stack
        direction="column"
        spacing={2}
        justifyContent={{ xs: "center" }}
        alignItems="center"
        sx={{ mx: "auto" }}
      >
        <Typography>Make Post</Typography>
        <Grid
          container
          direction="row"
          spacing={1}
          md={6}
          xs={12}
          justifyContent={{ xs: "center", md: "flex-start" }}
          sx={{ mx: "auto" }}
        >
          <Grid item xs={12}>
            <TextField
              id="post-title"
              label="Post title"
              variant="outlined"
              value={title}
              fullWidth
              required
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </Grid>
          {/* ------------------ Content ------------------ */}

          <Grid item xs={12}>
            <TextField
              id="content"
              label="Content"
              variant="outlined"
              value={content}
              fullWidth
              required
              onChange={(event) => {
                setContent(event.target.value);
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="media"
              label="Media"
              variant="outlined"
              value={media}
              fullWidth
              required
              onChange={(event) => {
                setMedia(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            {/* ------------------ Tags ------------------ */}
            <AutoCompleteFetcher
              label="Tag"
              noOptionsText="No tags found"
              setSelectedItem={setTargetTags}
              defaultItems={tags}
              apiURL="http://localhost:5001/search/tags?set=1"
              requestKey="name"
              multiple={true}
              noneValue={[]}
            />
          </Grid>
          <Grid item xs={6}>
            {/* ------------------ Category ------------------ */}
            <AutoCompleteFetcher
              label="Category"
              noOptionsText="No categories found"
              setSelectedItem={setTargetCategoryID}
              defaultItems={categories}
              apiURL="http://localhost:5001/search/categories?set=1"
              requestKey="name"
              valueKey="_id"
              multiple={false}
              noneValue=""
            />
          </Grid>
        </Grid>
        <Box>
          <Button version={"contained"} onClick={handleRequest}>
            Submit
          </Button>
        </Box>
      </Stack>
    </>
  );
}

// In order to avoid full page refresh on update we have to wrap the content in a seperate component
// Very hacky, but it works
export default function MakePost(props) {
  return (
    <Page title="Make Post">
      <PostForm {...props} />
    </Page>
  );
}

MakePost.auth = {
  admin: false,
};
