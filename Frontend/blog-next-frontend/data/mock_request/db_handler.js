import {
  admins,
  categories,
  location,
  media,
  posts,
  tags,
  users,
} from "../mock_db";


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

// Returns specific key value pairs
// key: item key
// value (optional): item value
// from: table name
//
// Example:
// get_KV("id", 1, "users") => [{id: 1, name: "John Doe"}]
// get_KV("name", "", "users") => [{id: 1, name: "John Doe"}, {id: 2, name: "Jane Doe"}, ...]
function get_KV(key, value = "", from) {
  let data = getFullDB()[from];

  if (value != "") {
    return data.filter((item) => item[key] === value);
  } else {
    return data.filter((item) => item[key]);
  }
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
};
