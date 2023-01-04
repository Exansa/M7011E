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

function GenericCard({ postID }) {
  const post = posts[postID - 1];
  const { data: session } = useSession();


  return (
    <>
      <Card raised sx={{ minWidth: 345, maxWidth: 345 }}>
        <NextLink
          passHref
          href={Routes.posts.post(post.id)}
          key={post.id}
          // as={Routes.posts.post(post.id)}
          // href={{
          //   pathname: Routes.posts.post("[postID]"),
          //   query: { postID: post.id },
          // }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              src={post.image.href}
              alt="image not found"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {post.title}
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
            {session
              &&(
                <>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </>
              )}
          
          </CardActions>
        </NextLink>
      </Card>
    </>
  );
}

export default GenericCard;
