import Page from "../../../resource/layout/page";
import { useSession } from "next-auth/react";
import AccessDenied from "../../../resource/components/accessDenied";
import {
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
//import { Category } from "@mui/icons-material";

//import { getCategories } from "../../data/mock_request/db_handler";
//console.log("0");

export async function getStaticPaths() {
  const res = await fetch("http://localhost:5001/posts?set=1");
  const posts = await res.json();

  //console.log('POSTS',posts)
  const paths = posts.map((post) => {
    return {
      params: { postID: post._id },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const resTags = await fetch("http://localhost:5001/tags?set=1");
  const tags = await resTags.json();
  const resCat = await fetch("http://localhost:5001/categories?set=1");
  const categories = await resCat.json();
  const resPost = await fetch("http://localhost:5001/posts/" + params.postID);
  const post = await resPost.json();
  //console.log('2')
  //console.log('params',params.postID);
  //console.log(tags);
  //console.log(categories);
  //console.log("3");
  return {
    props: {
      tags,
      categories,
      post,
      postID: params.postID,
    },
  };
}

export default function EditPost(context) {
  const [setCategory] = useState("");
  const [tagName, setTagName] = useState([]);
  const [image, setImage] = useState(null);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTagName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handlePicture = (e) => {
    const i = e.target.files[0];
    setImage(i);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const predata = {
      title: event.target.title.value,
      content: event.target.content.value,
      categories_id: [event.target.categories.value],
      tags_id: [event.target.tags.value],
      media: event.target.image.value,
    };
    const data = {
      user_id: session.user._id,
      post: predata,
    };

    const JSONdata = JSON.stringify(data);
    console.log(JSONdata);
    console.log(context.postID);
    const postRef = "http://localhost:5001/post/" + context.postID;
    const res = await fetch(postRef, {
      method: "PATCH",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSONdata,
    });

    console.log(JSONdata);
  };
  console.log(context.post)

  const { data: session } = useSession();
  if (
    !session ||
    (session &&
      session.user._id !== context.post.user_id &&
      session.user.access !== "admin" &&
      session.user.access !== "superAdmin")
  ) {
    return (
      <Page>
        <AccessDenied />
      </Page>
    );
  }
  return (
    <>
      <Page>
        <Container maxWidth="md">
          <form onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              label="Title"
              margin="normal"
              id="title"
              name="title"
              defaultValue={context.post.title}
            />

            <TextField
              required
              fullWidth
              multiline
              label="Blog post text"
              margin="normal"
              id="content"
              name="content"
              defaultValue={context.post.content}
            />
            <InputLabel id="demo-simple-select-helper-label">
              Category
            </InputLabel>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                labelId="demo-simple-select-helper-label"
                value={context.categories._id}
                label="Category"
                id="categories"
                name="categories"

                //onChange={handleChange}
              >
                {context.categories.map((categories) => (
                  <MenuItem
                    key={`menu-item-${categories._id}`}
                    value={categories._id}
                  >
                    {categories.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                labelId="demo-simple-select-helper-label"
                value={context.tags._id}
                label="Tags"
                id="tags"
                name="tags"

                onChange={handleChange}
              >
                {context.tags.map((tags) => (
                  <MenuItem
                    key={`menu-item-${context.tags._id}`}
                    value={tags._id}
                  >
                    {tags.name}
                  </MenuItem>
                ))}
                </Select>
            </FormControl>
            <TextField
              required
              fullWidth
              label="image"
              margin="normal"
              id="image"
              name="image"
              defaultValue={context.post.media}
            />
            <Button
              sx={{ m: 1, minWidth: 120 }}
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </form>
        </Container>
      </Page>
    </>
  );
}

EditPost.auth = {
  admin: false,
};
