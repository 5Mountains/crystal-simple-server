import { register } from "../services/userService.js";

const registerHandler = async (req, res) => {
  const result = await register(req.body);

  return res.json({ result });
};

export default registerHandler;
