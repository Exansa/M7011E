import { Stack, Typography, Button, Avatar, Box } from "@mui/material";
import { Image } from "mui-image";
import ResponsiveAppBar from "../../resource/components/global/headerBar";
import SpecificPost from "../../resource/components/posts/specificPost";
import getPosts from "../../data/mock_db/posts";

export default function Post() {
  let post = getPosts()[8];

  return (
    <div>
      <ResponsiveAppBar />
      <Box sx={{ width: "60%", mx: "auto" }}>
        <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
          <Image src={post.image.href} fit="scale-down" showLoading={false} />
          <Typography variant="h1" component="h2">
            {post.title}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Avatar src={post.user.image.href} alt={post.user.username} />
            <Typography variant="h4" component="h3">
              {post.user.username}
            </Typography>
          </Stack>
          <Typography variant="body1" component="p">
            {post.content}
          </Typography>
        </Stack>
      </Box>
    </div>
  );
}
