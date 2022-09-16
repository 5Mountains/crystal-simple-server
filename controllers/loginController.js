import { login } from "../services/userService.js";

const loginHandler = async (req, res) => {
  try {
    const result = await login(req.body);

    return res.json({ result });
  } catch (error) {
    return res
      .sendStatus(500)
      .json({ success: "false", message: error.message });
  }
};

export default loginHandler;
