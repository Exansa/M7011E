import admins from "../mock_db/admins";
import categories from "../mock_db/categories";
import location from "../mock_db/location";
import media from "../mock_db/media";
import posts from "../mock_db/posts";
import tags from "../mock_db/tags";
import users from "../mock_db/users";


function getAdmins() {
  return admins;
}

function getCategories() {
  return categories;
}

function getLocation() {
  return location;
}

function getMedia() {
  return media;
}

function getPosts() {
  return posts;
}

function getTags() {
  return tags;
}

function getUsers() {
  return users;
}

function getFullDB() {
  return {
    admins,
    categories,
    location,
    media,
    posts,
    tags,
    users,
  };
}

// Attaches external item to the main item
// from_id: item id
// from_table: table name
// to_item: item to attach to
// to_key: key to attach to
//
// Example:
// to_item = {id: 1, name: "John Doe", image_id: 2}
// to_key = "image_id"
// from_id = 2
// from_table = "media"
// to_item = attachLinkedItem(from_id, from_table, to_item, to_key)
// print(to_item) => {id: 1, name: "John Doe", image_id: {id: 2, url: "https://example.com/image.jpg"}}
function attachLinkedItem(from_id, from_table, to_item, to_key) {
  let item = get_KV("id", from_id, from_table)[0];
  to_item[to_key] = item;

  return to_item;
}

// Returns specific key value pairs
// key: item key
// value (optional): item value
// from: table name
//
// Example:
// get_KV("id", 1, "users") => [{id: 1, name: "John Doe"}]
// get_KV("name", "", "users") => [{id: 1, name: "John Doe"}, {id: 2, name: "Jane Doe"}, ...]
function get_KV(key, value, from) {
  let result = [];
  let db;

  switch (from) {
    case "admins":
      db = getAdmins();
      break;
    case "categories":
      db = getCategories();
      break;
    case "location":
      db = getLocation();
      break;
    case "media":
      db = getMedia();
      break;
    case "posts":
      db = getPosts();
      break;
    case "tags":
      db = getTags();
      break;
    case "users":
      db = getUsers();
      break;
    default:
      db = getFullDB();
  }

  db.map((item) => {
    if (item[key] == value) {
      result.push(item);
    }
  });

  return result;
  // if (value != "") {
  //   return data.filter((item) => item[key] === value);
  // } else {
  //   return data.filter((item) => item[key]);
  // }
}

// Returns values for the given key from an item that has the given key value pair
// s_key: searched key
// s_value: searched value
// r_key: returned key
// from: table name
//
// Example:
// get_ValueByMatchingKV("id", 1, "name", "users") => ["John Doe"]
// get_ValueByMatchingKV("name", "John Doe", "id", "users") => [1]

function get_ValueByMatchingKV(s_key, s_value, r_key, from) {
  let query = get_KV(s_key, s_value, from);
  let result = [];

  query.map((item) => {
    result.push(item[r_key]);
  });

  return result;
}

export {
  getAdmins,
  getCategories,
  getLocation,
  getMedia,
  getPosts,
  getTags,
  getUsers,
  get_KV,
  get_ValueByMatchingKV,
  attachLinkedItem,
};
