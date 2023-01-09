import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  CardActions,
  Button,
  Chip,
  Stack,
  Breadcrumbs,
  Container,
  CardHeader,
  Avatar,
} from "@mui/material";
import posts from "../../../data/mock_db/posts";
import Routes from "../../../resource/routes";
import NextLink from "next/link";
import { useSession } from "next-auth/react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Category } from "@mui/icons-material";

function GenericCard({ post }) {
  const { data: session } = useSession();

  if (!post.user) {
    return <></>;
  }

  console.log(post);

  return (
    <>
      <Card raised sx={{ minWidth: 345, maxWidth: 345 }}>
        <NextLink passHref href={Routes.posts.post(post._id)} key={post._id}>
          <CardActionArea>
            <CardHeader
              avatar={
                <Avatar
                  src={post.user.profile_picture}
                  alt={post.user.username}
                />
              }
              title={post.user.username}
            />
            <CardMedia
              component="img"
              height="140"
              src={post.media}
              alt="image not found"
            />
            <CardContent sx={{ maxHeight: 140, minHeight: 140 }}>
              <Typography>
                {post.title.length > 40
                  ? post.title.substring(0, 40) + "..."
                  : post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {post.categories[0] && post.categories[0].name}
              </Typography>
              <Breadcrumbs maxItems={3} separator="" sx={{ my: 1 }}>
                {post.tags[0] &&
                  post.tags.map((tag) => (
                    <Chip label={tag.name} size="small" />
                  ))}
              </Breadcrumbs>
              <Typography
                variant="body2"
                component="div"
                color="text.secondary"
              >
                {post.content.length > 90
                  ? post.content.substring(0, 90) + "..."
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
                <Button size="small" color="primary" href={Routes.posts.post(post)} key={post}>
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
