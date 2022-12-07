import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Button } from "@mui/material";
//import { get_ValueByMatchingKV } from "../../../data/mock_request/db_handler";
//{get_ValueByMatchingKV("id", parameter, "title", "posts")};
//{get_ValueByMatchingKV("id", parameter, "content", "posts")};
function GenericCard(parameter) {
    return(
        <Card sx={{ maxWidth: 345 }}>
        <CardActionArea href="/post/">
          <CardMedia
            component="img"
            height="140"
            image=".\images\6e9.jpg"
            alt="image not found"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Title
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Content
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Card>
    )
}

export default GenericCard;