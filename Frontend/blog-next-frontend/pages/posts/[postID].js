import { Stack, Typography, Button, Avatar, Box } from "@mui/material";
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
  //TODO: Swap posts in this  and get static props out for a call to the database
  const res = await fetch("http://localhost:5001/posts?set=1"); //<-- DB call
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
  const destination = "http://localhost:5001/posts/" + params.postID;
  const res = await fetch(destination);
  const post = await res.json();

  return {
    props: { post, destination },
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
            <Image src={post.media[0].href} duration={1000} />
            <Typography variant="h1" component="h2">
              {post.title}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              {/*TODO: Add user profile picture*/}
              <Avatar src="" alt={post.user.username} />
              <Typography variant="h4" component="h3">
                {post.user.username}
              </Typography>
            </Stack>
            <Typography variant="body1" component="p">
              {post.content}
            </Typography>
          </Stack>
          {/*{(user.id==post.id)
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
