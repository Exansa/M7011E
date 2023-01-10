import Page from "../../resource/layout/page";
import AdminPanel from "../../resource/components/admin/adminMainPanel";

export async function getStaticProps() {
  const postRes = await fetch("http:localhost:5001/posts?set=1");
  const postData = await postRes.json();
  const userRes = await fetch("http:localhost:5001/user?set=1");
  const userData = await userRes.json();
  const tagRes = await fetch("http:localhost:5001/tags?set=1");
  const tagData = await tagRes.json();
  const categoryRes = await fetch("http:localhost:5001/categories?set=1");
  const categoryData = await categoryRes.json();

  return {
    props: {
      posts: postData,
      users: userData,
      tags: tagData,
      categories: categoryData,
    },
  };
}

export default function AdminDashboard(context) {
  console.log("context:");
  console.log(context);
  return (
    <>
      <Page title="Admin">
        <AdminPanel data={context} />
      </Page>
    </>
  );
}
