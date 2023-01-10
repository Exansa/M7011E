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
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import posts from "../../../data/mock_db/posts";
import Routes from "../../../resource/routes";
import NextLink from "next/link";
import { useSession } from "next-auth/react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Category } from "@mui/icons-material";

export default function GenericCard({ post, key }) {
  const { data: session } = useSession();

  if (!post.user) {
    return (
      <Card key={key} sx={{ minWidth: 345, maxWidth: 345 }}>
        <CardContent>
          <Typography variant="body">
            Error loading card. <br />
            No user found for post {post._id}
          </Typography>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card key={key} raised sx={{ minWidth: "345px", maxWidth: "345px" }}>
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
              action={
                // <IconButton onClick=GÖRNÅGOT >
                <Box
                  sx={{
                    display:
                      session && session.user._id === post.user._id
                        ? "block"
                        : "none",
                  }}
                >
                  <NextLink
                    passHref
                    href={Routes.posts.edit(post._id)}
                    key={post._id}
                  >
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </NextLink>
                </Box>
              }
            />
            <CardMedia
              component="img"
              height="140"
              src={post.media}
              alt="image not found"
            />

            <CardContent
              sx={{
                maxHeight: "140px",
                minHeight: "140px",
                minWidth: "345px",
                maxWidth: "345px",
              }}
            >
              <Typography component="div">
                {post.title.length > 40
                  ? post.title.substring(0, 40) + "..."
                  : post.title}
              </Typography>
              <Typography
                variant="body2"
                component="div"
                color="text.secondary"
                gutterBottom
              >
                {post.categories[0] && post.categories[0].name}
              </Typography>
              <Breadcrumbs maxItems={3} separator="" sx={{ my: 1 }}>
                {post.tags[0] &&
                  post.tags.map((tag) => (
                    <Chip
                      key={post.title + "card-chip-" + tag.name}
                      label={tag.name}
                      size="small"
                    />
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
        </NextLink>
      </Card>
    );
  }
}
