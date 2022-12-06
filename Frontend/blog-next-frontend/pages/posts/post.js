import ResponsiveAppBar from "../../resource/components/global/headerBar";
import SpecificPost from "../../resource/components/posts/specificPost";
import posts from "../../data/mock_db/posts";

export default function Post() {
  return (
    <div>
      <ResponsiveAppBar />
      <SpecificPost item={posts[0]} />
    </div>
  );
}
