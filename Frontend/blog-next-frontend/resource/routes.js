const Routes = {
  posts: {
    index: "/posts",
    make: "/posts/makePost",
    post: (postID) => `/posts/${postID}`,
  },

  users: {
    index: "/profile",
    login: "/profile/login",
    register: "/profile/register",
    specific: (username) => `/profile/${username}`,
  },
};

export default Routes;