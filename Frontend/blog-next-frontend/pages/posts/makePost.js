import Page from "../../resource/layout/page";
import { useSession } from "next-auth/react";
import AccessDenied from "../../resource/components/accessDenied";
import {
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Box,
  FormControl,
  FormHelperText,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import * as React from "react";
import Tags from "../../data/mock_db/tags";
import Categories from "../../data/mock_db/categories";
import { useState } from "react";
import { useForm } from "react-hook-form";
//import { Category } from "@mui/icons-material";

//import { getCategories } from "../../data/mock_request/db_handler";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function makePost() {  

  // If no session exists, display access denied message
  //if (!session) { return  <Page><AccessDenied/></Page> }

  const [setCategory] = React.useState("");
  const [tagName, setTagName] = React.useState([]);
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
    setImage(i)
    /*let formData = new FormData();
    formData.append("data", JSON.stringify(i));
    formData.append("profile_picture", e.target.files[0]);
    axios.put("/api/update", formData).then(console.log).catch(console.log);*/
  };

  const handleSubmit = async (event)=> {
    event.preventDefault()

    const data = {
      user_id: session.user._id,
      title: event.target.title.value,
      content: event.target.content.value,
      categories_id: event.target.categories.value,
      tags_id: event.target.tags.value,
      image: event.target.image.value,
    }

    const JSONdata = JSON.stringify(data)

    console.log(JSONdata)

  }


  const { data: session } = useSession();
  if (!session){ return  <Page><AccessDenied/></Page> }
  return (
    <>
      <Page>
        <Container maxWidth="md">
          <form onSubmit={handleSubmit}>
            <TextField  required fullWidth label="Title" 
                        margin="normal" 
                        id='title'
                        name="title"
                        />

            <TextField
              required
              fullWidth
              multiline
              label="Blog post text"
              margin="normal"
              id='content'
              name="content"
            />
            <InputLabel id="demo-simple-select-helper-label">
              Category
            </InputLabel>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              labelId="demo-simple-select-helper-label"
              value={Categories.name}
              label="Category"
              id='categories'
              name="categories"
              
              //onChange={handleChange}
            >
              {Categories.map((Categories) => (
                <MenuItem value={Categories.name}>{Categories.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id='tags'
              multiple
              value={tagName}
              onChange={handleChange}
              input={<OutlinedInput label="Tags" />}
              renderValue={(selected) => selected.join(", ")}
              name="tags"
              
              //MenuProps={MenuProps}
            >
              {Tags.map((Tags) => (
                <MenuItem key={Tags.id} value={Tags.name}>
                  <Checkbox checked={tagName.indexOf(Tags.name) > -1} />
                  <ListItemText primary={Tags.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <input accept="*" 
            type="file" onChange={handlePicture} name="image" id='image' />

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
