import { logout } from "../services/userService.js";

const logoutHandler = async (req, res) => {
  try {
    const result = await logout(req);

    return res.json({ result });
  } catch (error) {
    return res
      .sendStatus(500)
      .json({ success: "false", message: error.message });
  }
};

export default logoutHandler;
