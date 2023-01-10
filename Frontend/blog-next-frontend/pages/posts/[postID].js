import {
  Stack,
  Typography,
  Button,
  Avatar,
  Box,
  Breadcrumbs,
  Chip,
} from "@mui/material";
import PropTypes from "prop-types";
import Page from "../../resource/layout/page";
import { Image } from "mui-image"; //https://github.com/benmneb/mui-image
import ResponsiveAppBar from "../../resource/layout/headerBar";
//import posts from "../../data/mock_db/posts";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// Post.PropTypes = {
//   post: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     content: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//   }),
//   featured: PropTypes.array,
// };

export async function getStaticPaths() {
  const res = await fetch("http://localhost:5001/posts?set=1");
  const posts = await res.json();

  const paths = posts.map((post) => {
    return {
      params: { postID: post._id },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch("http://localhost:5001/posts/" + params.postID);
  const post = await res.json();

  return {
    props: { post },
  };
}

const Post = (context) => {
  console.log(context);

  //const { user, error, isLoading } = useUser();
  const { data: session } = useSession();
  const post = context.post;

  return (
    <>
      <Page title={post.title}>
        <Box sx={{ width: "60%", mx: "auto", mt: 5 }}>
          <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
            <Image alt={post.title} src={post.media} duration={1000} />
            <Stack direction={"row"} alignItems="center" spacing={0}>
              <Typography variant="title" component="h2">
                {post.title}
              </Typography>
              <Typography variant="subtitle" color="text.secondary">
                - {post.categories[0] && post.categories[0].name}
              </Typography>
            </Stack>
            <Breadcrumbs separator="" sx={{ my: 3 }}>
              {post.tags[0] &&
                post.tags.map((tag) => (
                  <Chip
                    key={post.title + "card-chip-" + tag.name}
                    label={tag.name}
                    size="small"
                  />
                ))}
            </Breadcrumbs>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              {/*TODO: Add user profile picture*/}
              <Avatar
                src={post.user.profile_picture}
                alt={post.user.username}
              />
              <Typography variant="h5" component="h5">
                {post.user.username}
              </Typography>
            </Stack>
            <Typography variant="body2" component="p" color="text.secondary">
              {post.content}
            </Typography>
          </Stack>
          {/*{(session.user._id==post.user_id)
        &&(
        <Button>
          Edit
        </Button>
        )}*/}
        </Box>
      </Page>
    </>
  );
};

export default Post;
