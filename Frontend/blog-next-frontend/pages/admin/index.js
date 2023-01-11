import Page from "../../resource/layout/page";
import AdminPanel from "../../resource/components/admin/adminMainPanel";
import { useSession } from "next-auth/react";
import AccessDenied from "../../resource/components/accessDenied";

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

const checkAdmin = async (session) => {
  const adminRes = await fetch("http:localhost:5001/admin?set=1", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Authorization: Bearer ${session.accessToken}`,
    },
  });

  if (adminRes.status === 200) {
    return true;
  } else {
    return false;
  }
};

export default function AdminDashboard(context) {
  console.log("context:");
  console.log(context);

  const { data: session, status } = useSession();
  const isAdmin = session ? checkAdmin(session) : false;

  return (
    <>
      <Page title="Admin">
        {isAdmin ? <AdminPanel data={context} /> : <AccessDenied />}
      </Page>
    </>
  );
}
