import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Button } from "@mui/material";
import posts from "../../../data/mock_db/posts";
import Routes from "../../../resource/routes";
import NextLink from "next/link";
import { useSession } from "next-auth/react";
import { useUser } from "@auth0/nextjs-auth0/client";

function GenericCard({ post }) {
  const { data: session } = useSession();

  return (
    <>
      <Card
        raised
        sx={{ minWidth: 345, maxWidth: 345, minHeight: 320, maxHeight: 320 }}
      >
        <NextLink passHref href={Routes.posts.post(post._id)} key={post._id}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              src={post.media[0].href}
              alt="image not found"
            />
            <CardContent sx={{ maxHeight: 140, minHeight: 140 }}>
              <Typography gutterBottom variant="h5" component="div">
                {post.title.length > 25
                  ? post.title.substring(0, 25) + "..."
                  : post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.content.length > 150
                  ? post.content.substring(0, 150) + "..."
                  : post.content}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            {session &&
              (session.user._id==post.user_id)
              &&(
                <Button size="small" color="primary">
                  Edit
                </Button>
              )}
          </CardActions>
        </NextLink>
      </Card>
    </>
  );
}

export default GenericCard;
