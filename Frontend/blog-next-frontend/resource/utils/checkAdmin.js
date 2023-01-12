export const checkIfAdmin = async (session) => {
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

export const checkAdminRole = () => {};
