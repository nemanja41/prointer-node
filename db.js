const data = require("./data");

const insertUser = (data) => {
  return (data.users[data.users.length] = {
    id: "novi-id-je-napravlje-od-rednog-broja-" + data.users.length,
    ...data,
  });
};

const deleteUser = (id) => {
  const index = data.users.findIndex((u) => u.id === id);
  if (index >= 0) {
    delete data[index];
  }
  return index;
};

const findUserByEmail = (email) => {
  return data.users.find((u) => u.email === email);
};

const findUserById = (id) => {
  return data.users.find((u) => u.id === id);
};

module.exports.insertUser = insertUser;
module.exports.deleteUser = deleteUser;
module.exports.findUserByEmail = findUserByEmail;
module.exports.findUserById = findUserById;
