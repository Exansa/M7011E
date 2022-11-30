import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Button } from "@mui/material";

function GenericCard(post) {
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
                post.title
            </Typography>
            <Typography variant="body2" color="text.secondary">
                post.content
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