import ResponsiveAppBar from "../../resource/components/global/headerBar";
import axios from "axios";
import { Container, 
         TextField,
         Button,
         Select,
         MenuItem,
         InputLabel,
         Typography } from '@mui/material';
//import { getCategories } from "../../data/mock_request/db_handler";

const content = {
  key1: "value1",
  key2: "value2"
};

const Categories = [ {id: "1", name: "bikes"},  {id: "2", name: "sleds"},  {id: "3", name: "canons"}];

const handleChange = (event) => {
    setCategory(event.target.name)
}

export default function makePost() {
    const handleChange = (e) => {
        let formData = new FormData();
        formData.append("data", JSON.stringify(content));
        formData.append("profile_picture", e.target.files[0]);
        axios.put("/api/update", formData).then(console.log).catch(console.log);
 };
    return (
    <>
        <div>
            <ResponsiveAppBar />
        </div>
        <div>
            <Container maxWidth="md">
                <TextField 
                    required
                    fullWidth
                    label="Title"
                    margin="normal"
                />

                <TextField 
                    required
                    fullWidth
                    multiline
                    label="Blog post text"
                    margin="normal"
                />
                
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    fullWidth
                    label="Category"
                    onChange={handleChange}
                >
                {Categories.map((Category) => (
                  <MenuItem key={Category.id}>
                    <Typography textAlign="center">{Category.name}</Typography>
                  </MenuItem>
                ))}

                </Select>

                <input accept="*" type="file" onChange={handleChange} />

                <Button
                    //disabled={!myForm.isValid}
                    //onClick={myForm.submitForm}
                    variant="contained"
                >
                    Submit
                </Button>
            </Container>
        </div>
    </>
    )
}
