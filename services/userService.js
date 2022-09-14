import Datastore from "nedb-promises";
const userStore = Datastore.create("./store/user.db");

const response = (success, message, data) => ({ success, message, data });

const register = async (userData) => {
  const email = userData.email;
  const password = userData.password;
  const username = userData.username;

  if (!email) return response(false, "Email is required");
  if (!password) return response(false, "Password is required");
  if (!username) response(false, "Username is required");

  const isDuplicateEmail = !!(await userStore.findOne({ email }));
  if (isDuplicateEmail) return response(false, "Email is already exist");

  const isDuplicateUsername = !!(await userStore.findOne({ username }));
  if (isDuplicateUsername) return response(false, "Username is already exist");

  const newUser = { email, username, password };
  await userStore.insert(newUser);

  return response(true, `User - ${username} is successfully registered`);
};

export { register };
