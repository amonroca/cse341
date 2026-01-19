module.exports = function requireApiKey(expectedKey) {
  return function (req, res, next) {
    const provided = req.header('apiKey');
    if (!provided) {
      return res.status(401).json({ error: 'apiKey header is required' });
    }
    if (expectedKey && provided !== expectedKey) {
      return res.status(401).json({ error: 'Invalid apiKey' });
    }
    next();
  };
};
