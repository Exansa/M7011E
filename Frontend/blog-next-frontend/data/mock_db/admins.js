import users from "./users";

export default function getAdmins() {
  const admins = [
    { user: users[1], access: "super" },
    { user: users[2], access: "admin" },
    { user: users[3], access: "moderator" },
  ];

  return admins;
}
