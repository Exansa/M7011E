import ResponsiveAppBar from "../../resource/layout/headerBar";
import Page from "../../resource/layout/page";
import axios from "axios";
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
  const [setCategory] = React.useState("");
  const [tagName, setTagName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTagName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const submitForm = (event) => {
    create_new_post();
  };

  const handlePicture = (e) => {
    let formData = new FormData();
    formData.append("data", JSON.stringify(content));
    formData.append("profile_picture", e.target.files[0]);
    axios.put("/api/update", formData).then(console.log).catch(console.log);
  };
  return (
    <>
      <Page>
        <Container maxWidth="md">
          <TextField required fullWidth label="Title" margin="normal" />

          <TextField
            required
            fullWidth
            multiline
            label="Blog post text"
            margin="normal"
          />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={Categories.name}
              label="Category"
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
              id="demo-multiple-checkbox"
              multiple
              value={tagName}
              onChange={handleChange}
              input={<OutlinedInput label="Tags" />}
              renderValue={(selected) => selected.join(", ")}
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

          <input accept="*" type="file" onChange={handlePicture} />

          <Button
            sx={{ m: 1, minWidth: 120 }}
            //disabled={!myForm.isValid}
            //onClick={myForm.submitForm}
            variant="contained"
          >
            Submit
          </Button>
        </Container>
      </Page>
    </>
  );
}
