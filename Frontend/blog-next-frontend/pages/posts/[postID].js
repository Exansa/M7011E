import { Stack, Typography, Button, Avatar, Box } from "@mui/material";
import PropTypes from "prop-types";
import Page from "../../resource/layout/page";
import { Image } from "mui-image"; //https://github.com/benmneb/mui-image
import ResponsiveAppBar from "../../resource/layout/headerBar";
import posts from "../../data/mock_db/posts";
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

export const getStaticPaths = async () => {
  //TODO: Swap posts in this  and get static props out for a call to the database
  // const res = await fetch("https://jsonplaceholder.typicode.com/posts"); <-- DB call
  // const data = await res.json();

  const paths = posts.map((post) => {
    return {
      params: { postID: post.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async () => {
  // const res = await fetch("https://jsonplaceholder.typicode.com/posts"); <-- DB call
  // const data = await res.json();

  return {
    props: { posts },
  };
};

const Post = () => {
  // const Post = () => {
  //   const router = useRouter();
  //   const { pid } = router.query;

  //   return <p>Post: {pid}</p>;
  // };
  let router = useRouter();
  const { postID } = router.query;

  console.log(postID);
  const post = posts[postID - 1];

  const { data: session } = useSession()
  return (
    <>
      <Page title={post.title}>
        <Box sx={{ width: "60%", mx: "auto", mt: 5 }}>
          <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
            <Image src={post.image.href} duration={1000} />
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
          {/*{session
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
