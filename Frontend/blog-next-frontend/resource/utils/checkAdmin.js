/** Check if user is admin
 *
 * Be careful where you place this to avoid overloading the server
 * @param {object} session - session object from next-auth
 * @returns {string} - Admin type, else null
 */
export const checkAdmin = async (session) => {
  const adminRes = await fetch(
    `http://localhost:5001/admins/${session.user._id}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );

  if (adminRes.status === 200) {
    await adminRes.json().then((data) => {
      return data.access;
    });
  } else {
    return;
  }
};
