// users.js
const users = [];

function userjoin(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  return user;
}

function getcurrentuser(id) {
  return users.find(user => user.id === id);
}

module.exports = {
  userjoin,
  getcurrentuser
};
