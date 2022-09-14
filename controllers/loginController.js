const loginHandler = async (req, res) => {
  const result = await login(req.body);

  return res.json({ result });
};

export default loginHandler;
