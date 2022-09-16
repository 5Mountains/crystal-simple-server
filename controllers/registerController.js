import { register } from "../services/userService.js";

const registerHandler = async (req, res) => {
  try {
    const result = await register(req.body);

    return res.json({ result });
  } catch (error) {
    return res
      .sendStatus(500)
      .json({ success: "false", message: error.message });
  }
};

export default registerHandler;
