import Datastore from "nedb-promises";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userStore = Datastore.create("./store/user.db");

const response = (success, message, data) => ({ success, message, data });

const generateAccessToken = (username, expiresIn) => {
  return jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
};

const generateRefreshToken = (username, expiresIn) => {
  return jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn,
  });
};

const register = async (userData) => {
  const email = userData?.email;
  const password = userData?.password;
  const username = userData?.username;

  if (!email) return response(false, "Email is required");
  if (!password) return response(false, "Password is required");
  if (!username) return response(false, "Username is required");

  const isDuplicateEmail = !!(await userStore.findOne({ email }));
  if (isDuplicateEmail) return response(false, "Email is already exist");

  const isDuplicateUsername = !!(await userStore.findOne({ username }));
  if (isDuplicateUsername) return response(false, "Username is already exist");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { email, username, password: hashedPassword };

  await userStore.insert(newUser);

  return response(true, `User - ${username} is successfully registered`);
};

const login = async (userData) => {
  const username = userData?.username;
  const password = userData?.password;

  if (!username) return response(false, "Username is required");
  if (!password) return response(false, "Password is required");

  const foundUser = await userStore.findOne({ username });
  if (!foundUser) return response(false, "User is does not exist");

  const matchPassword = await bcrypt.compare(password, foundUser.password);
  if (!matchPassword) return response(false, "Password is does not match");

  if (matchPassword) {
    const accessToken = generateAccessToken(foundUser.username, "30m");
    const refreshToken = generateRefreshToken(foundUser.username, "7d");

    await userStore.update(
      { username: foundUser.username },
      { $set: { refreshToken: refreshToken } }
    );
    userStore.persistence.compactDatafile();

    return response(true, `User - ${username} is successfully login`, {
      token: accessToken,
    });
  }

  return response(true, "User is successfully logged in");
};

const logout = async () => {};

export { register, login, logout };
